const mongoose = require('mongoose')

const conSchema = new mongoose.Schema({
    title:String,
    slugTitle :String,
     videoUrl:String,
     like:[{
         userId:{type: mongoose.Schema.Types.ObjectId,
        ref: 'User'}}],
     dislikes:[{
        userId:{type: mongoose.Schema.Types.ObjectId,
       ref: 'User'}}],
     discription:String,
     views:Number 
},{timestamps:true})

module.exports = mongoose.model('HStalk', conSchema)