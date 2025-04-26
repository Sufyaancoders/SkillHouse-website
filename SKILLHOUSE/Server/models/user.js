const mongoose = require('mongoose');
const OTP = require('./OTP');

const userschema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
    },contactNumber: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    accountType:{
        type: String,
        enum: ["Admin","student","instructor" ],
        require: true
    },
    additionalDetail:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"profile",
    },resetPasswordToken: {
        type: String,
        default: undefined
    },
    resetPasswordExpiry: {
        type: Date,
        default: undefined
    },
    courses:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Course"
    }],
    Image:{
        type:String,
        required:true,
    },

    courseProgress:[
        {
          type:mongoose.Schema.Types.ObjectId,
          ref:"CourseProject",
        }
    ]
});

module.exports=mongoose.model("user", userschema);