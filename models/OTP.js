const mongoose = require('mongoose');
const OTPSchema = new mongoose.Schema({
   email: {
        type: String,
        required: true,
    },
otp:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
        },
   
  createdAt: {
        type: Date,
        default: Date.now,
        expires: 300 // OTP expires after 5 minutes
    }
})
module.exports = mongoose.model('OTP', OTPSchema);
// Compare this snippet from models/OTP.js: