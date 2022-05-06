const mongoose = require('mongoose')

const conSchema = new mongoose.Schema({
    title:String,
    slugTitle :String,
     videoUrl:String,
     like:Number,
     dislikes:Number,
     views:Number 
},{timestamps:true})

module.exports = mongoose.model('HStalk', conSchema)