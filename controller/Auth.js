//send otp
//sing up
//verify otp
//login
//logout
const OTP = require('../models/OTP');
const User = require('../models/user');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const sendEmail = require('../utils/mailSender'); // Import the sendEmail function
exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        
        // Check if user already exists
        //the curly braces define a query object with field-value pairs
        const checkUserEmail = await User.findOne({ email });
        if (checkUserEmail) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }
        
        // Generate a unique OTP
        let otpGenerated;
        let otpExists = true;
        
        // Keep generating until we find a unique OTP
        while (otpExists) {
            otpGenerated = otpGenerator.generate(6, { 
                upperCaseAlphabets: false, 
                lowerCaseAlphabets: false,
                specialChars: false,
                digits: true
            });

            
            // Check if this OTP already exists in the database
            const existingOtp = await OTP.findOne({ otp: otpGenerated });
            
            if (!existingOtp) {
                // If no duplicate found, we can use this OTP
                otpExists = false;
            }
        }
        
        // Save the new OTP to the database
        const otpBody = {
            email,
            otp: otpGenerated,
            createdAt: new Date()
        };
        
        const otpInstance = await OTP.create(otpBody);
        console.log("OTP instance created:", otpInstance);
        // Send OTP to user's email
        const mailResponse = await sendEmail(
            email,
            "Verification OTP for SkillHouse",
            `Your OTP for account verification is: ${otpGenerated}. Valid for 10 minutes.`
        );
        console.log("Mail response:", mailResponse);
        // console.log("OTP sent:", otpGenerated);
        
        return res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
            // Don't send the actual OTP in response for security
        });
        
    } catch (error) {
        console.error('Error sending OTP:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to send OTP',
            error: error.message
        });
    }
};

exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        
        // Find the most recent OTP for this email
        const otpRecord = await OTP.findOne({ 
            email, 
            otp 
        }).sort({ createdAt: -1 });
        
        if (!otpRecord) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }
        
        // OTP is valid, proceed with user registration
        // ... user registration logic
        
        // Delete the used OTP
        await OTP.deleteOne({ _id: otpRecord._id });
        
        return res.status(200).json({
            success: true,
            message: "OTP verified successfully"
        });
        
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to verify OTP',
            error: error.message
        });
    }
};

exports.singUp = async (req, res) => {
    //data fetching from the body
    //validate the data
    //password matching
    //check if the user already exists

    //find most recent OTP for this email
    //check if the OTP is valid

    //hash the password
    //create the user
    //send the response
     
    try {
        const { firstName, lastName, email, password, confirmPassword, contactNumber,accountType,otp } = req.body;
       //all the data is required
        if (!firstName || !lastName || !email || !password || !confirmPassword || !contactNumber) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        // Check if the email is valid
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }
         //check password matching
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }
        // Find the most recent OTP store for this email
        const otpRecord = await OTP.findOne({ 
            email, 
            otp 
        }).sort({ createdAt: -1 }).limit(1);
        console.log("OTP record found:", otpRecord);
        if (!otpRecord) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }else if (otpRecord.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });

        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
      const profileDetail =await profile.create({
        gender:null,
        dob:null,
        phone:null,
        about:null
       });

        // Create the user
        const newUser = new User(
            {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            confirmPassword: hashedPassword,
            contactNumber,
            accountType,
            additionalDetail: profileDetail._id, // Set this to null or provide a valid ObjectId reference
            Image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}` , // Set this to null or provide a valid URL or path to the image
            // courses: [], // Initialize with an empty array or provide an array of course IDs
            // courseProgress: [] // Initialize with an empty array or provide an array of course progress IDs
        }
    );
        
        await newUser.save();
        
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: newUser
        });
        
    }
    catch (error) {
        console.error('Error signing up:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to sign up',
            error: error.message
        });
    }
}