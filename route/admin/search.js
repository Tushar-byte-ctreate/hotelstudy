const route = require ('express').Router();
const Courses = require('../../modules/course')
const User = require('../../modules/user')

const Comment = require('../../modules/comment')
const Contect = require('../../modules/contectus')
const adminValidate = require('../middel');
const childValidate = require('../middel')

route.get('/shome/',(req,res)=>{
    var url =new URL( req.protocol + '://' + req.get('host') + req.originalUrl)
    const query = url.searchParams.get('search_type')
    console.log(query)
    
})
route.get('/scourse/',(req,res)=>{
    var url =new URL( req.protocol + '://' + req.get('host') + req.originalUrl)
    const query = url.searchParams.get('search_type')
    console.log(query)
    const user = req.user ||{
        username:'',
        name :''
    }
    const searches = Courses.find({name:{ $regex: query}})
console.log(searches)
})
route.get('/suser/',(req,res)=>{
    console.log('this is the vlue of home')
})
route.get('/spayment/',(req,res)=>{
    console.log('this is the vlue of home')
})





module.exports = route