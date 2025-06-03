const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");

//auth middleware to check if the user is authenticated
exports.auth = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1] || req.body.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Please login to access this resource",
    });
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
   console.log(decodedData);
// aditional code to written here
    req.user = await User.findById(decodedData.id)
    .populate("additionalDetailS");
     // For now, just pass through
  console.log("Auth middleware called");
    next();
  } catch (error) {
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
        if (req.user.accountType !== "Instructor") {
        return res.status(403).json({
        success: false,
        message: "Access denied, instructors only",
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
