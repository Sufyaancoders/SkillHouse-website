const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { 
    login,
    signup,
    sendOTP,
    // verifyOTP,
    // logout,
    // refreshToken,
    changePassword
} = require('../controller/Auth');
 const {
    resetPasswordToken,
    resetPassword} = require('../controller/ResetPassword');
// Authentication Routes
router.post('/login', login);
router.post('/signup', signup);
router.post('/send-otp', sendOTP);
router.post('/reset-password-token', resetPasswordToken);
router.post('/reset-password', resetPassword);
router.post('/change-password', auth, changePassword);

// router.post('/verify-otp', verifyOTP);
// router.get('/logout', auth, logout);
// router.post('/refresh-token', refreshToken);

module.exports = router;