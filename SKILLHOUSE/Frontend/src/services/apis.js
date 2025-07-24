const BASE_URL = "http://localhost:4000/api/v1"
// const BASE_URL = "https://skillhouse-backend-production.up.railway.app/api/v1"; // Update this to your actual base URL

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/send-otp",            // Fixed: added hyphen to match backend
  VERIFY_OTP_API: BASE_URL + "/auth/verify-otp",       // Added: missing endpoint
  SIGNUP_API: BASE_URL + "/auth/signup",               // No change: already correct
  LOGIN_API: BASE_URL + "/auth/login",                 // No change: already correct
  LOGOUT_API: BASE_URL + "/auth/logout",               // Added: missing endpoint
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token", // No change: already correct
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",        // No change: already correct
  CHANGE_PASSWORD_API: BASE_URL + "/auth/change-password",     // Added: missing endpoint
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_PROFILE_API: BASE_URL + "/profile/profile",            // Add missing endpoint
  UPDATE_PROFILE_API: BASE_URL + "/profile/update",               // Updated to match backend
  DELETE_PROFILE_API: BASE_URL + "/profile/delete",               // Updated to match backend
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/update-picture", // Updated to match backend
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/enrolled-courses", // Updated to match backend
  GET_USER_DETAILS_API: BASE_URL + "/profile/user-details", 
  GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",      // Updated to match backend route
}

// STUDENTS ENDPOINTS - Update names to match backend routes
export const studentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + "/payment/capture-payment", // Updated to match backend route
  COURSE_VERIFY_API: BASE_URL + "/payment/verify-manual",    // Updated to match backend route
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/send-success-email", // Updated
  CHECK_ENROLLMENT_API: BASE_URL + "/payment/check-enrollment", // Added missing endpoint
  PAYMENT_HISTORY_API: BASE_URL + "/payment/history",          // Added missing endpoint
  WEBHOOK_API: BASE_URL + "/payment/webhook",                  // Added missing endpoint
}

// COURSE ENDPOINTS
export const courseEndpoints = {
  GET_ALL_COURSE_API: BASE_URL + "/course/all",
  COURSE_DETAILS_API: BASE_URL + "/course/details", // Will need /:courseId at usage
  EDIT_COURSE_API: BASE_URL + "/course/edit", // Will need /:courseId at usage
  CREATE_COURSE_API: BASE_URL + "/course/create",
  DELETE_COURSE_API: BASE_URL + "/course/delete", // Will need /:courseId at usage
  GET_FULL_COURSE_DETAILS_API: BASE_URL + "/course/getFullDetails", // Will need /:courseId at usage
  GET_ENROLLED_COURSES_API: BASE_URL + "/course/enrolled",
  GET_TOP_SELLING_COURSES_API: BASE_URL + "/course/top-selling", // New endpoint
   COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
  // Section operations
  CREATE_SECTION_API: BASE_URL + "/course/addSection",
  UPDATE_SECTION_API: BASE_URL + "/course/section/updateSection",
  DELETE_SECTION_API: BASE_URL + "/course/section/deleteSection",
  
  // Subsection operations - Fixed to match backend routes
  CREATE_SUBSECTION_API: BASE_URL + "/course/subsection", // Will append /:sectionId in API call
  UPDATE_SUBSECTION_API: BASE_URL + "/course/subsection", // Will append /:subSectionId in API call
  DELETE_SUBSECTION_API: BASE_URL + "/course/subsection", // Will append /:subSectionId in API call
  
  // Other operations
    GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
  GET_INSTRUCTOR_COURSES_API: BASE_URL + "/course/instructor",
  UPDATE_COURSE_PROGRESS_API: BASE_URL + "/course/updateProgress",
  GET_COURSES_BY_CATEGORY_API: BASE_URL + "/course/category", // Will need /:categoryId at usage
}

// RATINGS AND REVIEWS
// RATINGS AND REVIEWS - Update to match backend routes
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/course/ratings", // Updated to match backend
  CREATE_RATING_API: BASE_URL + "/course/rating",    // Added missing endpoint
  GET_AVERAGE_RATING_API: BASE_URL + "/course/rating", // Added missing endpoint for average rating
}

// CATAGORIES API
export const categories = {
  CATEGORIES_API: BASE_URL + "/course/showAllCategories",    // Updated to match backend
  CATEGORY_DETAILS_API: BASE_URL + "/course/category", // Added to match backend
  CREATE_CATEGORY_API: BASE_URL + "/course/category", // Added for admin functionality
}

// CATALOG PAGE DATA
export const catalogData = {
  CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails",
}
// CONTACT-US API
// export const contactusEndpoints = {
//   CONTACT_US_API: BASE_URL + "/reach/contact",
// }

// SETTINGS PAGE API
// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/update-picture", // Updated to match backend
  UPDATE_PROFILE_API: BASE_URL + "/profile/update",                 // Updated to match backend
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",           // Keep as is (backend endpoint not shown)
  DELETE_PROFILE_API: BASE_URL + "/profile/delete",                 // Updated to match backend
}

// Add this to your apis.js file
export const contactEndpoints = {
  CONTACT_US_API: BASE_URL + "/reach/contact"
};