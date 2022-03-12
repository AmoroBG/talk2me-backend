// REQUIRE PACKAGES - EXTERNAL
const mongoose = require("mongoose");

const userSchema={
    firstName:{
        type:String,
        require:true
    }, 
    lastName:{
        type:String,
        require:true
    },
       phone:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
}
const User=mongoose.model("User", userSchema)
module.exports=User
