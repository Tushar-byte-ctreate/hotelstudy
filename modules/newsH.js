const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
     title:{type:String, required:true, unique:true},
     slugTitle:{type:String, required:true},
     discription:String,
     type:String,
      image:{
        data: Buffer,
        contentType: String
      },
      username:{type:String},
     content:{type:String, required:true},
     user:{ type: mongoose.Schema.Types.ObjectId,
        ref: 'User'},
        date: String

})





module.exports= mongoose.model('News',newsSchema)