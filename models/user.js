const mongoose = require('mongoose');

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