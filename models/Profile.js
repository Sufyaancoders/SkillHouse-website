const mongoose=require("mongoose");
 const profileschema=new mongoose.Schema({
    gender:{
        type:String,
        required:true,  

    },
    dob:{
        type:Date,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    about:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    education:{
        type:String,
        required:true,
    }});
    module.exports=mongoose.model("profile",profileschema);