const route = require ('express').Router();
const Courses = require('../../modules/course')
const User = require('../../modules/user')

const Comment = require('../../modules/comment')
const Contect = require('../../modules/contectus')
const course = require('./course')
const validation = require('../middel')
const adminValidate = require('../middel');
const childValidate = require('../middel')

var slugify = require('slugify')
// route.use(adminValidate)

const users = require('./user')
const company = require('./company')
const contact = require('./contactus')

route.use(users)
 route.use(course)
 route.use(company)
 route.use(contact)
route.get('/admin-home',adminValidate, async (req,res)=>{

    const user =  await User.find({})
    const uc = user.length
    const course = await  Courses.find({})
    const cc = course.length
    const comment = await  Comment.find({})
    
    const coc = comment.length
    const contect = await  Contect.find({})
    const limit = 7, index = 0;
const contact = contect.slice(index, limit + index)

    res.render('admin/a-home', {contect:contact, cc:cc,uc:uc,coc:coc,error:req.flash('error'),info:req.flash('info')});
})


route.get('/course/pages/list/admin',adminValidate,(req,res)=>{
    res.render('admin/a-page',{error:req.flash('error'),info:req.flash('info')})
})
route.get('/user/payments/admin',childValidate,adminValidate, (req,res)=>{
    res.render('admin/a-payment',{error:req.flash('error'),info:req.flash('info')})
})


module.exports = route