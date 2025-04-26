const user = require("../models/user");
const mailSender = require("../utils/mailSender");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

// Reset password when user has forgotten it (requires OTP verification first)

exports. resetPassword= async (req, res) => {
    try {
        const { token, newPassword, confirmNewPassword } = req.body;
        
        if (!token || !newPassword || !confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        
        // Check if passwords match
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords don't match"
            });
        }
        
        // Hash the token to compare with the hashed one in database
        const hashedToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');
        
        // Find user with this token and valid expiry
        const userInstance = await user.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpiry: { $gt: Date.now() } // Check if token hasn't expired
        });                         //$gt --> that means "greater than".
        
        // Check if token is valid and not expired
        if (!userInstance) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired reset token"
            });
        }
        
        // Hash new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        
        // Update user's password
        userInstance.password = hashedNewPassword;
        
        // Clear reset token fields
        userInstance.resetPasswordToken = undefined;
        userInstance.resetPasswordExpiry = undefined;
        
        await userInstance.save();
        
        // Send confirmation email
        await mailSender(
            userInstance.email,
            "Password Changed Successfully",
            "Your password has been changed successfully. If you didn't perform this action, please contact our support team immediately."
        );
        
        return res.status(200).json({
            success: true,
            message: "Password reset successful"
        });
    } catch (error) {
        console.error("Error resetting password:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to reset password",
            error: error.message
        });
    }
};

// resetPasswordtoken 

exports. resetPasswordToken= async (req, res) => {
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
            // For security reasons, don't specify if the email exists in the system
            return res.status(200).json({
                success: false,
                message: "If your email exists in our system, you will receive reset instructions"
            });
        }
        
        // Generate a secure reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        // Hash the token before storing it (so it's not exposed if DB is breached)
        const hashedResetToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');
        
        // Set expiration (10 minutes from now)
        const resetTokenExpiry = Date.now() + 10 * 60 * 1000;
        
        // Store token and expiry in user document
        userInstance.resetPasswordToken = hashedResetToken;
        userInstance.resetPasswordExpiry = resetTokenExpiry;
        await userInstance.save();
        
        // Create reset URL for the email
            const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;
        
        // Send email with the reset URL
        await mailSender(
            userInstance.email,
            "Password Reset Request", //subject
            // body
            `You requested a password reset. Please click the link below to reset your password. This link is valid for 10 minutes:\n\n${resetUrl}\n\nIf you didn't request this, please ignore this email.`
        );
        
        // Send response (for security, don't confirm if user exists)
        return res.status(200).json({
            success: true,
            message: "If your email exists in our system, you will receive reset instructions"
        });
    } catch (error) {
        console.error("Error sending reset password token:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to send reset password token",
            error: error.message
        });
    }
};