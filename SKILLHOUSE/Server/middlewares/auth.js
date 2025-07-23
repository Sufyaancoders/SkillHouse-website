const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");

//auth middleware to check if the user is authenticated
exports.auth = async (req, res, next) => {
  let token = req.cookies.token || req.headers.authorization?.split(" ")[1] || req.body.token;

  console.log("=== AUTH MIDDLEWARE DEBUG ===");
  console.log("Cookies:", req.cookies);
  console.log("Authorization header:", req.headers.authorization);
  console.log("Body token:", req.body.token);
  console.log("Extracted token:", token);
  
  // Remove quotes from token if present
  if (token && typeof token === 'string') {
    token = token.replace(/^["'](.*)["']$/, '$1');
    console.log("Token after quote removal:", token);
  }

  if (!token) {
    console.log("No token found");
    return res.status(401).json({
      success: false,
      message: "Please login to access this resource",
    });
  }

  try {
    console.log("Verifying token with secret:", process.env.JWT_SECRET ? "SECRET EXISTS" : "NO SECRET");
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token data:", decodedData);
// aditional code to written here
    req.user = await User.findById(decodedData.id)
    .populate("additionalDetails");
    console.log("User found:", req.user ? "YES" : "NO");
     // For now, just pass through
  console.log("Auth middleware called");
    next();
  } catch (error) {
    console.log("Token verification error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid token, please login again",
    });
  } 
};
  
//         await user.save();
//isSignedIn = true;
//         // Send success response
 exports.isStudents = async (req, res, next) => {
    try{ 
        if (req.user.accountType !== "Student") {
        return res.status(403).json({
        success: false,
        message: "Access denied, students only",
        });
    }
    next();
}
catch (error) {
    return res.status(500).json({
        success: false,
        message: "Server error",
    });
}
}

//isInstructor = true;

exports.isInstructor = async (req, res, next) => {
    try{ 
        console.log("=== INSTRUCTOR MIDDLEWARE DEBUG ===");
        console.log("User account type:", req.user?.accountType);
        console.log("User ID:", req.user?.id || req.user?._id);
        console.log("====================================");
        
        if (req.user.accountType !== "Instructor") {
        return res.status(403).json({
        success: false,
        message: "Access denied, instructors only",
        });
    }
    console.log("Instructor check passed, proceeding to controller");
    next();
}
catch (error) {
    console.log("Error in isInstructor middleware:", error);
    return res.status(500).json({
        success: false,
        message: "Server error",
    });
}
}
//isAdmin = true;
exports.isAdmin = async (req, res, next) => {
    try{ 
        if (req.user.accountType !== "Admin") {
        return res.status(403).json({
        success: false,
        message: "Access denied, admins only",
        });
    }
    next();
}
catch (error) {
    return res.status(500).json({
        success: false,
        message: "Server error",
    });
}
}
