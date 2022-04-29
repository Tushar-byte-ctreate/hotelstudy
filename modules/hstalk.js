const mongoose = require('mongoose')

const conSchema = new mongoose.Schema({
    title:String,
     videoUrl:String  
},{timestamps:true})

module.exports = mongoose.model('HStalk', conSchema)