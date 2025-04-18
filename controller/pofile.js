const profile = require("../model/profile");
const user = require("../model/user");

exports.updateProfile = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;
       // user id from the token 
        const userId = req.user._id;

        // Find the user by ID
        const userProfile = await profile.findById(userId);

        if (!userProfile) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the user's profile
        userProfile.name = name || userProfile.name;
        userProfile.email = email || userProfile.email;
        userProfile.phone = phone || userProfile.phone;
        userProfile.address = address || userProfile.address;

        await userProfile.save();

        return res.status(200).json({ message: "Profile updated successfully", data: userProfile });
    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}