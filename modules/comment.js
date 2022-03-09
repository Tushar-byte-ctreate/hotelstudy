const mongoose = require('mongoose')

const conSchema = new mongoose.Schema({
     postId:{ type: mongoose.Schema.Types.ObjectId},
     admin:{ type: mongoose.Schema.Types.ObjectId,
          ref: 'User'},
     name:String,
     email:String,
     comment:String,
     reply:[],
    
},{timestamps:true})

module.exports = mongoose.model('Comment', conSchema)