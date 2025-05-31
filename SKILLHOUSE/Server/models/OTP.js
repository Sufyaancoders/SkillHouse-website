const mongoose = require('mongoose');

// Define the schema without automatic email sending
const OTPSchema = new mongoose.Schema({
   email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,  
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300 // OTP expires after 5 minutes
    }
});

// REMOVE the pre-save hook entirely
// We'll handle OTP generation and email sending in the controller

// Export the OTP model
module.exports = mongoose.model('OTP', OTPSchema);