const mongoose = require("mongoose");
const courseProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  progress: {
    type: Number,
    required: true,
    default: 0,
  },
  lastAccessed: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CourseProgress", courseProgressSchema);