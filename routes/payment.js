const express = require('express');
const router = express.Router();
const { auth, isStudent } = require('../middlewares/auth');
const { 
    capturePayment,
    verifySignature,
    verifyPayment,
    // sendPaymentSuccessEmail,
    // checkCourseEnrollment,
    // getPaymentHistory
} = require('../controllers/Payment');
const { auth, isInstructor, isStudent,isAdmin } = require('../middlewares/auth');
// Route to initiate payment
router.post('/capture-payment', auth, isStudent, capturePayment);

// Webhook for payment verification (no auth needed as it's called by Razorpay)
router.post('/verify-signature', verifyPayment);
router.post('/verify-signature', verifySignature);

// Route to manually verify a payment (fallback)
router.post('/verify-manual', auth, verifyPayment);

// Check if user is enrolled in a course
router.get('/check-enrollment/:courseId', auth, checkCourseEnrollment);

// Get payment history for the logged-in user
router.get('/history', auth, getPaymentHistory);

module.exports = router;