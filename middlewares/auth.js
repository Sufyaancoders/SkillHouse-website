const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user");

//auth middleware to check if the user is authenticated
exports.isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1] || req.body.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Please login to access this resource",
    });
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
   
// aditional code to wr
    req.user = await User.findById(decodedData.id)
    .populate("additionalDetail");
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
