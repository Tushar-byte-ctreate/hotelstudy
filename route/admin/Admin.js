const route = require ('express').Router();


const course = require('./course')
const validation = require('../middel')
const adminValidate = require('../middel');

var slugify = require('slugify')
// route.use(adminValidate)

const users = require('./user')
const company = require('./company')

route.use(users)
 route.use(course)
 route.use(company)
route.get('/admin-home',adminValidate,(req,res)=>{
    res.render('admin/a-home', {error:req.flash('error'),info:req.flash('info')});
})


route.get('/course/pages/list/admin',adminValidate,(req,res)=>{
    res.render('admin/a-page',{error:req.flash('error'),info:req.flash('info')})
})
route.get('/user/payments/admin',adminValidate,(req,res)=>{
    res.render('admin/a-payment',{error:req.flash('error'),info:req.flash('info')})
})


module.exports = route