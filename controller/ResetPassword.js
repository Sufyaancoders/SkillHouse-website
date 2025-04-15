const user = require("../models/user");
const mailSender = require("../utils/mailSender");



// Reset password when user has forgotten it (requires OTP verification first)

exports.resetPassword = async (req, res) => {
    try {
        const { email, newPassword, confirmNewPassword } = req.body;

        // Validate input
        if (!email || !newPassword || !confirmNewPassword) {
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

        // Find the user by email
        const userInstance = await user.findOne({ email });

        // Check if user exists
        if (!userInstance) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Hash new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password
        userInstance.password = hashedNewPassword;
        await userInstance.save();
        // Send success response
        return res.status(200).json({
            success: true,
            message: "Password reset successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
}

// resetPasswordtoken 

exports.resetPasswordToken = async (req, res) => {
    try {
        const { email } = req.body;

        // Validate input
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        // Find the user by email
        const userInstance = await user.findOne({ email });

        // Check if user exists
        if (!userInstance) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Generate a reset password token (this is just an example, you should use a more secure method)
        const resetToken = crypto.randomBytes(20).toString('hex');

        // Send email with the reset token (you need to implement this function)
        await mailSender.sendResetPasswordEmail(userInstance.email, resetToken);

        return res.status(200).json({
            success: true,
            message: "Reset password token sent to email"
        });
    } catch (error) {
        console.error("Error sending reset password token:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to send reset password token",
            error: error.message
        });
    }
}