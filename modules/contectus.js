const mongoose = require('mongoose')
const contectSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String , required:true},
    message : {type:String },
    checkBox:String,
    date:{type:String}
})

module.exports = mongoose.model('Contect',  contectSchema)