const mongoose = require("mongoose");
const profileschema = new mongoose.Schema({
    gender: {
        type: String,
        required: false,  // Change to false
        default: "Not specified"
    },
    dob: {
        type: Date,
        required: false,  // Change to false
        default: new Date()
    },
    phone: {
        type: String,
        required: false,  // Change to false
        default: ""
    },
    about: {
        type: String,
        required: false,  // Change to false
        default: "No information provided"
    },
    location: {
        type: String,
        required: false,  // Change to false
        default: "Not specified"
    },
    education: {
        type: String,
        required: false,  // Change to false
        default: "Not specified"
    }
});
module.exports = mongoose.model("profile", profileschema);