const mongoose = require("mongoose");
const subsectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    timeduration: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    
    video: {
        type: String,
        required: true,
    },
});
module.exports = mongoose.model("Subsection", subsectionSchema);