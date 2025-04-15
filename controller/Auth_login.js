const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.login = async (req, res) => {
    try {
        // Extract credentials
        const { email, password } = req.body;
        
        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide both email and password"
            });
        }
        
        // Find user by email
        const user = await User.findOne({ email })
        .populate("additionalDetail");
        
        // Check if user exists
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User does not exist, please sign up first"
            });
        }
        
        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        
        // Generate JWT token
        const payload = {
            email: user.email,
            id: user._id,
            accountType: user.accountType
        };
        
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1hr"
        });
        
        // Add token to user object for response
        user.token = token;
        // Don't send password in response
        user.password = undefined;
        
        // Set cookie for token
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
            httpOnly: true
        };
        
        // Send response with cookie
        return res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user,
            message: "Logged in successfully"
        });
        
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "Login failed",
            error: error.message
        });
    }
};

// Optional: Add logout functionality
exports.logout = (req, res) => {
    try {
        // Clear the cookie
        res.clearCookie("token");
        
        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({
            success: false,
            message: "Error logging out",
            error: error.message
        });
    }
};