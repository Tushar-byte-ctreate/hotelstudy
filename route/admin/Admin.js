const route = require ('express').Router();
const Courses = require('../../modules/course')
const User = require('../../modules/user')

const Comment = require('../../modules/comment')
const Contect = require('../../modules/contectus')
const course = require('./course')

const adminValidate = require('../middel');
const childValidate = require('../middel')

var slugify = require('slugify')
// route.use(adminValidate)

const users = require('./user')
const company = require('./company')
const contact = require('./contactus')
const hst = require('./hst')
const search = require('./search')

route.use(hst)
route.use(users)
route.use(course)
route.use(company)
route.use(contact)
route.use(search)

 function validation(req,res,next) {
    const user_name = req.user.username 
   
    if(user_name == "thisistusharkumar@gmail.com"){
        next();
    }else{
        req.flash('error',"Please contact to Mr, Tushar for more information")
        res.redirect('/admin-home')
    }
    
}

route.get('/admin-home',adminValidate, async (req,res)=>{

    const user =  await User.find({})
    const uc = user.length
    const course = await  Courses.find({})
    const cc = course.length
    const comment = await  Comment.find({})
    
    const coc = comment.length
    const contect = await  Contect.find({}).limit().sort({$natural:-1})
    const limit = 7, index = 0;
const contact = contect.slice(index, limit + index)

    res.render('admin/a-home', {contect:contact,user:req.user,cc:cc,uc:uc,coc:coc,error:req.flash('error'),info:req.flash('info'),search:"shome"});
})


route.get('/course/pages/list/admin',adminValidate,(req,res)=>{
    res.render('admin/a-page',{error:req.flash('error'),info:req.flash('info'),search:"scourse"})
})
route.get('/user/payments/admin',validation,adminValidate, (req,res)=>{
    res.render('admin/a-payment',{user:req.user,error:req.flash('error'),info:req.flash('info'),search:"spayment"})
})
module.exports = route