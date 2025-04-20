const express = require('express');
const router = express.Router();
const { auth, isInstructor, isStudent, isAdmin } = require('../middleware/auth');

// Course controller imports
const { 
    createCourse,
    getAllCourses,
    getCourseDetails,
    getFullCourseDetails,
    editCourse,
    deleteCourse,
    getEnrolledCourses,
    updateCourseProgress,
    getInstructorCourses,
    getCoursesByCategory,
    getTopSellingCourses
} = require('../controller/Course');

// Category controller imports
const {
    showAllCategories,
    createCategory,
    categoryDetails
} = require("../controller/Category");

// Section controller imports
const {
    createSection,
    updateSection,
    deleteSection
} = require("../controller/Section");

// Subsection controller imports
const {
    createSubSection,
    updateSubSection,
    deleteSubSection
} = require("../controller/Subsection");

// Rating controller imports
const {
    createRating,
    getAverageRating,
    getallRating
} = require("../controller/RatingandReview");

// Course Creation and Management
router.post('/create', auth, isInstructor, createCourse);
router.put('/edit/:courseId', auth, isInstructor, editCourse);
router.delete('/delete/:courseId', auth, isInstructor, deleteCourse);

// Course Retrieval
router.get('/all', getAllCourses);
router.get('/details/:courseId', getCourseDetails);
router.get('/getFullDetails/:courseId', auth, getFullCourseDetails);
router.get('/instructor', auth, isInstructor, getInstructorCourses);
router.get('/enrolled', auth, isStudent, getEnrolledCourses);
router.get('/category/:categoryId', getCoursesByCategory);
router.get('/top-selling', getTopSellingCourses);

// Course Progress
router.post('/updateProgress', auth, isStudent, updateCourseProgress);

// Section Management
router.post('/section/:courseId', auth, isInstructor, createSection);
router.put('/section/:sectionId', auth, isInstructor, updateSection);
router.delete('/section/:sectionId', auth, isInstructor, deleteSection);

// Subsection Management
router.post('/subsection/:sectionId', auth, isInstructor, createSubSection);
router.put('/subsection/:subSectionId', auth, isInstructor, updateSubSection);
router.delete('/subsection/:subSectionId', auth, isInstructor, deleteSubSection);

// Category Management
router.get('/categories', showAllCategories);
router.post('/category', auth, isAdmin, createCategory);
router.get('/category/:categoryId', categoryDetails);

// Rating and Review
router.post('/rating', auth, isStudent, createRating);
router.get('/rating/:courseId', getAverageRating);
router.get('/ratings', getallRating);

module.exports = router;
