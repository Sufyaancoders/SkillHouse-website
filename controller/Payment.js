const {instance} = require('../config/razorpay');
const Course = require('../models/course');
const User = require('../models/user');
const mailSender = require('../utils/mailSender');
const {CourseEnrolled} = require('../utils/EnrollmentMail');
const crypto = require('crypto'); // Add this import

// capture payment and initiate rozorpay order

exports.capturePayment = async (req, res) => {
    try{
        // Get the course ID and user ID from the request body
        const { courseId } = req.body;
        const userId = req.user.id; // Assuming you have middleware to set req.user
        // Validate input
        if (!courseId || !userId) {
            return res.status(400).json({
                success: false,
                message: "Please provide all the fields",
            });
        }
        // Find the course by ID
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        // Check if the user is already enrolled in the course
        const user = await User.findById(userId);
        const isEnrolled = user.studentsEnrolled.some(id => id.toString() === courseId.toString());

        if (isEnrolled) {
            return res.status(400).json({
                success: false,
                message: "User is already enrolled in this course"
            });


        }
    }catch (error) {
        console.error("Error capturing payment:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
    // Create a Razorpay order
    const options = {
        amount: course.price * 100, // Amount in paise
        currency: "INR",
        receipt: `receipt_${Math.random() * 100000}`,
        notes: {
            courseId: course._id.toString(),
            userId: userId,
        },
    };
    try {
        //initiate razorpay payment
        const order = await instance.orders.create(options);
        console.log("Razorpay order created:", order);
        return res.status(200).json({
            success: true,
            message: "Order created successfully",
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            courseName: course.courseName,
            thumbnail: course.thumbnail,
            couseDescription: course.courseDescription,
        });

    }
    catch (error) {
        console.error("Error creating Razorpay order:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create order",
            error: error.message,
        });
    }
}


// Verify signature and serve the course
 
exports.verifySignature = async (req, res) => {
    const webhookSecret = "12345678"; // Replace with your actual webhook secret
    // razorpay signature is provided by the razorpay server
    const signature = req.headers['x-razorpay-signature'];
    
    const shasum = crypto.createHmac('sha256', webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest('hex');
    
    console.log("Signature:", signature);
    console.log("Digest:", digest);
    
    // Check if the signature is valid
    if (signature !== digest) {
        return res.status(400).json({
            success: false,
            message: "Invalid signature",
        });
    }

    try {
        // Extract courseId and userId from the webhook payload
          //This line is extracting two critical pieces of information (courseId and userId) from the webhook 
        // payload sent by Razorpay after a payment is completed.
        const {courseId, userId} = req.body.payload.payment.entity.notes;
        
        // Update course with new student enrollment
        const enrollmentCourse = await Course.findOneAndUpdate(
            {_id: courseId},
            {$push: {studentsEnrolled: userId}},
            {new: true}
        );
        
        if (!enrollmentCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }
        
        // Update user with new course enrollment
        const enrolledStudent = await User.findOneAndUpdate(
            {_id: userId},
            {$push: {studentsEnrolled: courseId}},
            {new: true}
        );
        
        if (!enrolledStudent) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        
        // Send confirmation email to the user - Fixed to use the variables we have
        await mailSender(
            enrolledStudent.email,  
            "Course Enrollment Confirmation", 
            CourseEnrolled(
                enrollmentCourse.courseName, 
                enrollmentCourse.courseDescription, 
                enrollmentCourse.thumbnail
            )
        );
        
        return res.status(200).json({
            success: true,
            message: "Payment verified and course enrolled successfully",
            data: {
                courseName: enrollmentCourse.courseName,
                thumbnail: enrollmentCourse.thumbnail,
                courseDescription: enrollmentCourse.courseDescription,
            },
        });
    } catch (error) {
        console.error("Error verifying payment:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to verify payment",
            error: error.message,
        });
    }
};
