const mongoose = require("mongoose");
const courseProgressSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
    required: true,
  },
  completedvideo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subsection",
    required: true,
  }
});

module.exports = mongoose.model("CourseProgress", courseProgressSchema);
