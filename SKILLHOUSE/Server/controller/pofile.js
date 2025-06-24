const profile = require("../models/profile");
const User = require("../models/user");
const { auth, isInstructor } = require('../middlewares/auth');
const Course = require("../models/course");
const { uploadImageToCloudinary } = require("../utils/imageUpload");

exports.updateProfile = async (req, res) => {
    try {
        const{dob="",about="",phone,gender}=req.body;
        // user id from token
        const userId = req.user._id; // Assuming you have user ID from the request
        //va;idate input
        if(!phone || !gender || !userId){
            return res.status(400).json({
                success: false,
                message: "Please provide all the fields",
            });
        }
        //find profile by user id
       
        const userDetails = await User.findById(userId);
        const profileId = userDetails.additionalDetails; // Assuming you have a profileId field in your user model
        const profileDetails = await profile.findById(profileId);
        if (!profileDetails) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }
        //update profile
        profileDetails.dob = dob;
        profileDetails.about = about;
        profileDetails.phone = phone;
        profileDetails.gender= gender;
        await profileDetails.save();
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: profileDetails,
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error",
            error: error.message
        });
    }
}
 
//delete profile
exports.deleteAccount = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming you have user ID from the request
        //find user by id
        const userDetails = await User.findById(userId);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        //delete profile
        await profile.findByIdAndDelete(userDetails.additionalDetails);
        //delete user
        await User.findByIdAndDelete(userId);
        return res.status(200).json({
            success: true,
            message: "Account deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting account:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error",
            error: error.message
        });
    }
}

//get profile
exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming you have user ID from the request
        //find user by id
        const userDetails = await User.findById(userId).populate("additionalDetails").exec();
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            data: userDetails.additionalDetails,
        });
    } catch (error) {
        console.error("Error fetching profile:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Internal server error",
            error: error.message
        });
    }
}

exports.updateDisplayPicture = async (req, res) => {
  try {
    // Check if file exists in request
    if (!req.files || !req.files.displayPicture) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image"
      });
    }

    const file = req.files.displayPicture;
    
    // Upload to Cloudinary
    const result = await uploadImageToCloudinary(
      file,
      process.env.FOLDER_NAME || "profile_pics"
    );
    
    // Update user profile picture URL in database
    const userId = req.user._id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { Image: result.secure_url },
      { new: true }
    );
    
    res.status(200).json({
      success: true,
      message: "Display picture updated successfully",
      data: updatedUser
    });
    
  } catch (error) {
    console.error("Error updating display picture:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while updating display picture"
    });
  }
};

exports.getUserDetails = async (req, res) => {
    try {
      // Get user ID from authenticated request
      const userId =  req.params.userId || req.user._id;
      
      // Find user with all their details populated
      const userDetails = await User.findById(userId)
        .populate("additionalDetails")
        .select("-password -refreshToken") // Exclude sensitive information
        .exec();
      
      if (!userDetails) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }
      
      return res.status(200).json({
        success: true,
        message: "User details fetched successfully",
        data: userDetails
      });
      
    } catch (error) {
      console.error("Error fetching user details:", error);
      return res.status(500).json({
        success: false, 
        message: "Failed to retrieve user details",
        error: error.message
      });
    }
};

exports.getInstructorDashboard = async (req, res) => {
   try {
    // Use _id instead of id for consistency
    const courseDetails = await Course.find({ instructor: req.user._id });
    
    // Handle case when no courses are found
    if (courseDetails.length === 0) {
      return res.status(200).json({ 
        success: true,
        message: "No courses found for this instructor",
        courses: [] 
      });
    }

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnroled?.length || 0;
      const totalAmountGenerated = totalStudentsEnrolled * course.price;

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        thumbnail: course.thumbnail,
        price: course.price,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      }

      return courseDataWithStats
    });

    res.status(200).json({ 
      success: true,
      message: "Instructor dashboard data retrieved successfully",
      courses: courseData 
    });
    
  } catch (error) {
    console.error("Error fetching instructor dashboard:", error);
    res.status(500).json({ 
      success: false,
      message: "Error fetching instructor dashboard data",
      error: error.message 
    });
  }
}