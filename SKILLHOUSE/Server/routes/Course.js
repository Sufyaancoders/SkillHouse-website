const express = require('express');
const router = express.Router();
const { auth, isInstructor, isStudents, isAdmin } = require('../middlewares/auth');

// Course controller imports
const { 
    createCourse,
    getAllCourses,
    getCourseById,
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
    getAllCategories,
    createCategory,
    getCategoryDetails
} = require("../controller/Category");

// Section controller imports
const {
    createSection,
    updateSection,
    deleteSection
} = require("../controller/Section");

// Subsection controller imports
const {
    createSubsection ,
    updateSubSection,
    deleteSubSection
} = require("../controller/Subsection");

// Rating controller imports
const {
    createRatingAndReview,
    getAverageRating,
    getAllRatingAndReviews
} = require("../controller/RatingandReview");

// Course Creation and Management
router.post('/create', auth, isInstructor, createCourse);
router.put('/edit/:courseId', auth, isInstructor, editCourse);
router.delete('/delete/:courseId', auth, isInstructor, deleteCourse);

// Course Retrieval
router.get('/all', getAllCourses);
router.get('/details/:courseId',  getCourseById);
router.get('/getFullDetails/:courseId', auth, getFullCourseDetails);
// router.get('/instructor', auth, isInstructor, getInstructorCourses);

router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
router.get('/enrolled', auth, isStudents, getEnrolledCourses);
router.get('/category/:categoryId', getCoursesByCategory);
router.get('/top-selling', getTopSellingCourses);

// Course Progress
router.post('/updateProgress', auth, isStudents, updateCourseProgress);

// Section Management
router.post('/section/:courseId', auth, isInstructor, createSection);
router.put('/section/:sectionId', auth, isInstructor, updateSection);
router.delete('/section/:sectionId', auth, isInstructor, deleteSection);

// Subsection Management
router.post('/subsection/:sectionId', auth, isInstructor, createSubsection );
router.put('/subsection/:subSectionId', auth, isInstructor, updateSubSection);
router.delete('/subsection/:subSectionId', auth, isInstructor, deleteSubSection);

// Category Management
router.get('/showAllCategories', getAllCategories);
router.post('/category', auth, isAdmin, createCategory);
router.get('/category/:categoryId', getCategoryDetails);

// Rating and Review
router.post('/rating', auth, isStudents, createRatingAndReview);
router.get('/rating/:courseId', getAverageRating);
router.get('/ratings', getAllRatingAndReviews);

module.exports = router;
