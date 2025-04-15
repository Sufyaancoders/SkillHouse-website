const User = require('../models/user');
const bcrypt = require('bcrypt');
// Add this to your changePassword.js file
const sendEmail = require('../utils/mailSender');
exports.changePassword = async (req, res) => {
    try {
        // Get user ID from request (assuming auth middleware adds user to req)
        const userId = req.user.id;
        
        // Extract password information
        const { oldPassword, newPassword, confirmNewPassword } = req.body;
        
        // Validate input
        if (!oldPassword || !newPassword || !confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        
        // Check if new passwords match
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "New passwords don't match"
            });
        }
        
        // Find the user
        const user = await User.findById(userId);
        // Check if user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        // Verify old password
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Current password is incorrect"
            });
        }


        
        // Hash new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        
        // Update user's password
        user.password = hashedNewPassword;
        
        // If you store confirmPassword in your schema, update that too
        if (user.confirmPassword) {
            user.confirmPassword = hashedNewPassword;
        }
        
        // Save updated user
        await user.save();
        
        // Send email notification (optional)
        // await sendEmail(
        //     user.email,
        //     "Password Changed - SkillHouse",
        //     "Your password has been changed successfully. If you didn't request this change, please contact support immediately."
        // );
        
        return res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });
        
    } catch (error) {
        console.error("Change password error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to change password",
            error: error.message
        });
    }
};

// Reset password when user has forgotten it (requires OTP verification first)
