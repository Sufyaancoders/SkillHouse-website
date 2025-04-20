const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/course");
const mongoose = require("mongoose"); // Added mongoose for ObjectId

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

// get average rating of a course
exports.getAverageRating = async (req, res) => {
    try {
        // Use either params or body, but not both (fixed the variable redeclaration issue)
        const courseId = req.params.courseId || req.body.courseId;
        
        // Validate input
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required"
            });
        }

        // Use aggregation to calculate the average rating directly in the database
        const result = await RatingAndReview.aggregate([
            // Stage 1: Match only ratings for this course
            { $match: { course: new mongoose.Types.ObjectId(courseId) } },
            
            // Stage 2: Group and calculate statistics
            { $group: {
                _id: "$course",
                averageRating: { $avg: "$rating" },
                numberOfRatings: { $sum: 1 }
            }}
        ]);

        // If no ratings found, return 0 as the average
        if (result.length === 0) {
            return res.status(200).json({
                success: true,
                averageRating: 0,
                numberOfRatings: 0
            });
        }

        // Return the calculated result
        return res.status(200).json({
            success: true,
            averageRating: result[0].averageRating,
            numberOfRatings: result[0].numberOfRatings
        });
    } catch (error) {
        console.error("Error calculating average rating:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while calculating average rating",
            error: error.message
        });
    }
};
// get all rating and reviews of a course
exports.getAllRatingAndReviews = async (req, res) => {
    try {
     
        const allRatingAndReviews = await RatingAndReview.find({})
        .sort({rating: "desc"})
        .populate("user", "firstName lastName email profileImage")
        .populate("course", "courseName ")
        .exec();
        // Check if ratings and reviews exist
        if (!allRatingAndReviews || allRatingAndReviews.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No ratings and reviews found"
            });
        }
        return res.status(200).json({
            success: true,
            data: allRatingAndReviews
        });

     
    } catch (error) {
        console.error("Error fetching ratings and reviews:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while fetching ratings and reviews",
            error: error.message
        });
    }
};