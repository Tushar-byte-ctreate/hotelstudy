const route = require ('express').Router();
const Course = require('../modules/course')


route.get('/', async(req,res) => {

const courses = await Course.find({})
const title = "HotelStudy";
    res.render('home',{title: "HotelStudy",course:courses,user:req.user,description:""})
        
    
})



module.exports = route