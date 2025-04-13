const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
    },
    courseDescription: {
        type: String,
        required: true,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    whatYouWillLearn: {
        type: String,
        required: true,
    },
    coursecontent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
            required: true,
        },
    ],
    ratingAndReview: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatingAndReview",
        },
    ],
    price: {
        type: Number,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    tags: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    studentsEnrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
    ],
});
module.exports = mongoose.model("Course", courseSchema);