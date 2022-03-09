const mongoose = require('mongoose')

const hsSchema = new mongoose.Schema({
    title:{type:String, required:true},
    slug:{type:String},
   content:{type:String},
   discription:{type:String},   
})

module.exports = mongoose.model('Company', hsSchema)