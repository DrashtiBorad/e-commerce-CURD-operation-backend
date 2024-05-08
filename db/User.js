const { default: mongoose } = require("mongoose");

const userSchema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    mobileNo:Number,
});

module.exports=mongoose.model("users",userSchema)