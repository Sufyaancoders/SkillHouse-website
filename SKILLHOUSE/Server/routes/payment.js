const express = require('express');
const router = express.Router();

const { auth, isStudents } = require('../middlewares/auth');
const {
  capturePayment,
  verifySignature,
  verifyPayment,
  sendPaymentSuccessEmail,
  checkCourseEnrollment,
  getPaymentHistory
} = require('../controller/Payment');

router.post('/capture-payment', auth, isStudents, capturePayment);
router.post('/webhook', verifySignature);
router.post('/verify-manual', auth, verifyPayment);
router.post('/send-success-email', auth, sendPaymentSuccessEmail);
router.get('/check-enrollment/:courseId', auth, checkCourseEnrollment);
router.get('/history', auth, getPaymentHistory);

module.exports = router;
