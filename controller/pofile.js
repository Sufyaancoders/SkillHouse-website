const profile = require("../model/profile");
const user = require("../model/user");

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
       
        const userDetails = await user.findById(userId);
              const  profileId = userDetails.additionalDetails; // Assuming you have a profileId field in your user model
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
        return res.status(500).json({ message: "Internal server error" });
    }
}
 
//delete profile

exports.deleteAccount = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming you have user ID from the request
        //find user by id
        const userDetails = await user.findById(userId);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        //delete profile
        await profile.findByIdAndDelete(userDetails.additionalDetails);
        //delete user
        await user.findByIdAndDelete(userId);
        return res.status(200).json({
            success: true,
            message: "Account deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting account:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
//get profile
exports.getProfile = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming you have user ID from the request
        //find user by id
        const userDetails = await user.findById(userId).populate("additionalDetails").exec();
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
        return res.status(500).json({ message: "Internal server error" });
    }
}