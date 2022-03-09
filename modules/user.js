const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    name:String,
    username:{type:String,   unique:true},
    profile:{type:String, default:"https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/64/000000/external-user-interface-kiranshastry-lineal-color-kiranshastry-1.png"},
    admin: {type:String,default:false},
    salt:{type:String},
    hash:String,
    resetPasswordToken : String,
    resetPasswordExpires:Date
    
},{timestamps:true})

userSchema.plugin(passportLocalMongoose);



module.exports= mongoose.model('User',userSchema)


