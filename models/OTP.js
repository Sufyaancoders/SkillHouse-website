const mongoose = require('mongoose');
const sendEmail = require('../utils/mailSender'); // Import the sendEmail function
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

 //a function  --> to send email to the user with the OTP
 async function sendVerificationEmail(email, otp) {
    try {
        const subject = 'Your OTP Code';
        const text = `Your OTP code is ${otp}. It is valid for 5 minutes.`;
        await sendEmail(email, subject, text); // Call the sendEmail function
    } catch (error) {
        console.error('Error sending email:', error);
    }
}
 OTPSchema.pre('save', async function (next) {
    if (this.isNew) {
        const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
        this.otp = otp; // Set the OTP field
        await sendVerificationEmail(this.email, otp); // Send the OTP email
    }
    next();
});
// Export the OTP model
module.exports = mongoose.model('OTP', OTPSchema);

// Compare this snippet from models/OTP.js: