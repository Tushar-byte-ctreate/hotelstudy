const mongoose = require('mongoose')
;
const newsSchema = new mongoose.Schema({
    title:{type:String, required:true},
   content:{type:String},
   description:{type:String},   
})

module.exports = mongoose.model('News6', newsSchema)