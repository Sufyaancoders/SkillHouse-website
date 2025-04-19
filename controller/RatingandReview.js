const RatingAndReview = require("../models/ratingAndReview");
const Course = require("../models/course");

//create rating and review

exports.createRatingAndReview = async (req, res) => {
    try{
        const { rating, review, courseId } = req.body; // Get rating, review, and course ID from request body
        const userId = req.user._id; // Get user ID from request object

        // Validate input
        if (!rating || !review || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Rating, review, and course ID are required"
            });
        }

        //check if user is enrolled in the course
        const courseDetails= await Course.findOne({_id:courseId, studentsEnrolled:{$elemMatch:{$eq:userId}}});
        if(!courseDetails){
            return res.status(400).json({
                success: false,
                message: "User is not enrolled in this course"
            });
        }
       //check if user has already given rating and review for this course
        const existingRatingAndReview = await RatingAndReview.findOne({ user: userId, course: courseId });
        if (existingRatingAndReview) {
            return res.status(400).json({
                success: false,
                message: "User has already given a rating and review for this course"
            });
        }
        // Create a new rating and review
        const newRatingAndReview = await RatingAndReview.create({
            rating,
            review,
            course: courseId,
            user: userId
        });
        // Update the course with the new rating and review
        await Course.findByIdAndUpdate(courseId, {
            $push: { ratingAndReviews: newRatingAndReview._id },
            $inc: { totalRating: rating, numberOfRatings: 1 } // Increment total rating and number of ratings
        }
        , { new: true });
         console.log(newRatingAndReview);
        // Return success response
        return res.status(201).json({
            success: true,
            message: "Rating and review created successfully",
            data: newRatingAndReview
        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
}