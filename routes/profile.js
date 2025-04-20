const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const { 
     updateProfile,
    getUserProfile,
    deleteAccount,
    updateDisplayPicture,
 getEnrolledCourses,
 getUserDetails,
    // getInstructorDashboard,
    // changePassword,
    // updateContactInfo,
    // addExperience,
    // removeExperience,
    // updateEducation,
    // updateSocialLinks
} = require('../controllers/Profile');

// Basic profile operations
router.get('/', auth, getUserProfile);
router.put('/update', auth, updateProfile);
router.delete('/delete', auth, deleteAccount);
router.put('/update-picture', auth, updateDisplayPicture);
// router.put('/change-password', auth, changePassword);
// router.put('/update-contact', auth, updateContactInfo);
router.get('/enrolled-courses', auth, getEnrolledCourses);
router.get('/user-details/:userId', auth, getUserDetails);

// Student-specific routes
router.get('/enrolled-courses', auth, getEnrolledCourses);

// // Instructor-specific routes
// router.get('/instructor/dashboard', auth, isInstructor, getInstructorDashboard);
// router.post('/experience', auth, isInstructor, addExperience);
// router.delete('/experience/:experienceId', auth, isInstructor, removeExperience);
// router.put('/education', auth, isInstructor, updateEducation);
// router.put('/social-links', auth, updateSocialLinks);

module.exports = router;