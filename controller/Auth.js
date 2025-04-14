//send otp
//sing up
//verify otp
//login
//logout
const OTP = require('../models/OTP');
const User = require('../models/user');
const otpGenerator = require('otp-generator');

exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        
        // Check if user already exists
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
        const { name, email, password, confirmPassword, accountType,  } = req.body;
        console.log("Received data:", req.body); // Debugging line

        // Check if the user already exists
        const checkUserEmail = await User.findOne({ email });
        if (checkUserEmail) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Validate the OTP
        const otpRecord = await OTP.findOne({ email }).sort({ createdAt: -1 });
        if (!otpRecord || otpRecord.otp !== req.body.otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP"
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            accountType,
            additionalDetail: otpRecord._id // Assuming you want to link this to the OTP record
        });

        // Delete the used OTP
        await OTP.deleteOne({ _id: otpRecord._id });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: newUser
        });
    } catch (error) {
        console.error('Error during signup:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to register user',
            error: error.message
        });
    }
}