const { default: mongoose } = require("mongoose");

const ProfileUserSchema=new mongoose.Schema({
    image:String,
    firstName:String,
    lastName:String,
    email:String,
})
module.exports=mongoose.model('profile',ProfileUserSchema)