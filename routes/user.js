const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { 
    
    signup,
    sendOTP,
    verifyOTP,
    // refreshToken,
    changePassword
} = require('../controller/Auth');
const {
    login,
    logout,
    // refreshToken,
} = require('../controller/Auth_login');
 const {
    resetPasswordToken,
    resetPassword
} = require('../controller/ResetPassword');
// Authentication Routes
router.post('/login', login);
router.post('/signup', signup);
router.post('/send-otp', sendOTP);
//
console.log("sendOTP is:", typeof sendOTP, sendOTP);

router.post('/reset-password-token', resetPasswordToken);
router.post('/reset-password', resetPassword);
router.post('/change-password', auth, changePassword);

router.post('/verify-otp', verifyOTP);
 router.get('/logout', auth, logout);
// router.post('/refresh-token', refreshToken);

module.exports = router;

// Temporary placeholder for debugging
// const tempSendOTP = (req, res) => {
//     res.send('OTP route works!');
//   };
  
//   // Use this instead temporarily
//   router.post('/send-otp', tempSendOTP);
console.log({
    login: typeof login,
    signup: typeof signup,
    sendOTP: typeof sendOTP,
    verifyOTP: typeof verifyOTP,
    resetPasswordToken: typeof resetPasswordToken,
    resetPassword: typeof resetPassword,
    changePassword: typeof changePassword,
    logout: typeof logout
  });