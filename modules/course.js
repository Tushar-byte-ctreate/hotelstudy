const mongoose = require('mongoose')
const slugify = require('slugify');

const courseSchema = new mongoose.Schema({
    
        name: {type:String , unique:true},
        discription: String,
        slugCourse:{type:String, unique:true},
        tags:{type:String},
        admin:{ type: mongoose.Schema.Types.ObjectId,
            ref: 'User'},
            articles:[{ 
                title:{type:String , default:"one"},
                slugtitle:{type:String},
                content:{type:String},
                discription:{type:String},
                user:{ type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'},
                date:{type:String}
            }]
},{
    timestamps:true
})

courseSchema.pre('validate', function(next){
    if(this.name){
    this.slugCourse = slugify(this.name,{lower:true , strict:true , replacement: '-'})
    }
    next()
})
courseSchema.pre('validate',function(next){
    if(this.articles.title){
    this.articles.slugTitle = slugify(this.articles.title,{lower:true , strict:true, replacement: '-'})
    }
    next()
})


module.exports = mongoose.model('Courses', courseSchema)