const mongoose = require("mongoose");
const category = require("./category");
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
      instructions: {
        type: [String],
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
      type:[String],
      required:true,
    }
    ,category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true,
    },
    studentsEnrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
    ],
    status: {
        type: String,
        enum: ["Draft", "published"],
    },
    
});
module.exports = mongoose.model("Course", courseSchema);