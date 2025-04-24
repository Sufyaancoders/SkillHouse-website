const {instance} = require('../config/razorpay');
const Course = require('../models/course');
const User = require('../models/user');
const mailSender = require('../utils/mailSender');
const {CourseEnrolled} = require('../mail/templates/couseEnrollimentEmail');
const crypto = require('crypto'); // Add this import

// capture payment and initiate rozorpay order

exports.capturePayment = async (req, res) => {
    try {
        // Get the course ID and user ID from the request body
        const { courseId } = req.body;
        const userId = req.user.id;
        
        // Validate input
        if (!courseId || !userId) {
            return res.status(400).json({
                success: false,
                message: "Please provide all the fields"
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
        const isEnrolled = user.courses.includes(courseId);

        if (isEnrolled) {
            return res.status(400).json({
                success: false,
                message: "User is already enrolled in this course"
            });
        }

        // Create a Razorpay order
        const options = {
            amount: course.price * 100, // Amount in paise
            currency: "INR",
            receipt: `receipt_${Math.floor(Math.random() * 100000)}`,
            notes: {
                courseId: course._id.toString(),
                userId: userId
            }
        };
        
        // Initiate razorpay payment
        const order = await instance.orders.create(options);
        
        return res.status(200).json({
            success: true,
            message: "Order created successfully",
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            courseName: course.courseName,
            thumbnail: course.thumbnail,
            courseDescription: course.courseDescription
        });
        
    } catch (error) {
        console.error("Error creating payment:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create payment order",
            error: error.message
        });
    }
};


// Verify signature and serve the course
 
exports. verifySignature = async (req, res) => {
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

//verifyPayment

exports.verifyPayment= async (req, res) => {
    try {
        // Get payment details from request body
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } = req.body;
        
        // Validate required fields
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Payment verification failed: Missing required parameters"
            });
        }
        
        // Get the secret key from environment variables (should be same as used for creating orders)
        const secret = process.env.RAZORPAY_SECRET || "your_razorpay_secret";
        
        // Create the expected signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", secret)
            .update(body)
            .digest("hex");
        
        // Verify signature
        const isAuthentic = expectedSignature === razorpay_signature;
        
        if (!isAuthentic) {
            return res.status(400).json({
                success: false,
                message: "Payment verification failed: Invalid signature"
            });
        }
        
        // Get user ID from authenticated request
        const userId = req.user.id;
        
        // Enroll student in the course
        // 1. Update course with the new student
        await Course.findByIdAndUpdate(
            courseId,
            { $push: { studentsEnrolled: userId } },
            { new: true }
        );
        
        // 2. Update user with the new course
        const enrolledStudent = await User.findByIdAndUpdate(
            userId,
            { $push: { courses: courseId } },
            { new: true }
        );
        
        // 3. Find the course details for the email
        const enrolledCourse = await Course.findById(courseId);
        
        // 4. Send confirmation email
        await mailSender(
            enrolledStudent.email,
            "Course Enrollment Confirmation",
            CourseEnrolled(
                enrolledCourse.courseName,
                enrolledCourse.courseDescription,
                enrolledCourse.thumbnail
            )
        );
        
        // Return success response
        return res.status(200).json({
            success: true,
            message: "Payment verified and course enrollment successful",
            data: {
                orderId: razorpay_order_id,
                paymentId: razorpay_payment_id,
                course: enrolledCourse.courseName
            }
        });
        
    } catch (error) {
        console.error("Payment verification error:", error);
        return res.status(500).json({
            success: false,
            message: "Payment verification failed",
            error: error.message
        });
    }
};

// Add these exports at the end of your Payment.js file

/**
 * Simple email notification after successful payment
 */
exports.sendPaymentSuccessEmail = async (req, res) => {
    try {
        const { courseId, paymentId } = req.body;
        const userId = req.user.id;
        
        // Get user and course details
        const user = await User.findById(userId);
        const course = await Course.findById(courseId);
        
        if (!user || !course) {
            return res.status(404).json({
                success: false,
                message: "User or course not found"
            });
        }
        
        // Send email
        const emailContent = `
            <h1>Payment Successful!</h1>
            <p>Hello ${user.firstName},</p>
            <p>Your payment for the course "${course.courseName}" was successful.</p>
            <p>Payment ID: ${paymentId}</p>
            <p>You can now access your course in your dashboard.</p>
        `;
        
        await mailSender(
            user.email,
            "Course Payment Successful",
            emailContent
        );
        
        return res.status(200).json({
            success: true,
            message: "Success email sent"
        });
        
    } catch (error) {
        console.error("Error sending success email:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to send success email"
        });
    }
};

/**
 * Check if user is enrolled in a course
 */
exports. checkCourseEnrollment = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user.id;
        
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        
        const isEnrolled = user.courses.includes(courseId);
        
        return res.status(200).json({
            success: true,
            isEnrolled
        });
        
    } catch (error) {
        console.error("Error checking enrollment:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to check enrollment"
        });
    }
};

/**
 * Get user's payment history
 */
exports. getPaymentHistory= async (req, res) => {
    try {
        const userId = req.user.id;
        
        // For a real implementation, you would need a Payments collection
        // This is a simplified version that just returns enrolled courses
        const user = await User.findById(userId).populate("courses");
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        
        // Map courses to payment history format
        const paymentHistory = user.courses.map(course => ({
            courseId: course._id,
            courseName: course.courseName,
            amount: course.price,
            purchaseDate: course.createdAt // Not accurate but a placeholder
        }));
        
        return res.status(200).json({
            success: true,
            data: paymentHistory
        });
        
    } catch (error) {
        console.error("Error getting payment history:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to get payment history"
        });
    }
}; 