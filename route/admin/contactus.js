const route = require ('express').Router();
const Contect = require('../../modules/contectus')
const nodemailer = require("nodemailer");

const adminValidate = require('../middel');

const transporter = nodemailer.createTransport({
    host: "hotelstudy.com",
   service:'gmail',
    auth: {
      user:process.env.USER_EMAIL, // generated ethereal user
      pass: process.env.USER_PASS, // generated ethereal password
    },
  });
route.get('/admin/contact/us/page', adminValidate,async (req,res)=>{

    const data = await Contect.find({}).limit().sort({$natural:-1})
    try{
        res.render("admin/contactus",{data:data,user:req.user,error:req.flash('error'),info:req.flash('info'),search:"scontact"})
    }catch(error){
        req.flash('error',error.message)
        res.redirect('/admin/contact/us/page')
    }
})
route.get('/admin/contact/message/:id',adminValidate,async(req,res)=>{
    const id = req.params.id
   
    const getingUser =await Contect.findById(id)
  
    try {
        res.render('admin/message',{userData : getingUser , search:"scontact",user:req.user,error:req.flash('error'),info:req.flash('info')})
    } catch (error) {
        req.flash('error',error.message)
        res.redirect('/admin/contact/us/page')
    }
})
route.get('/admin/contact/delete/:id',adminValidate,async (req,res) => {
    const id = req.params.id
    const formDeleting = await Contect.findOneAndDelete({_id: id})
    try {
        req.flash('info',"Contect form has been deleted")
        res.redirect('/admin/contact/us/page')
    } catch (error) {
        req.flash('error',error.message)
        res.redirect('/admin/contact/us/page')
    }
})
route.get('/admin/give/reply/:id',adminValidate,async(req,res)=>{
    const id =  req.params.id
    const getData = await Contect.findOne({_id:id})
    try {
        
        res.render('admin/sendRply',{userData : getData , search:"scontact",user:req.user,error:req.flash('error'),info:req.flash('info')})
    } catch (error) {
        req.flash('error',error.message)
        res.redirect('/admin/contact/message/:id'+id+'')
    }
  })
// giving the reply to user by sending an email to user
///admin/give/reply/

route.post('/admin/contact/reply/:id',adminValidate, (req,res)=>{
    const id = req.params.id
    var mailOptions = {
      to: req.body.email,
      from: '"HotelStudy"<hotelstudy.noreply>',
      subject: 'Reply of Your Email',
      text: ''+req.body.message +' ,\n\n' +
        ' Thanks! for contact us. \n\n'+
        'Regarding... \n.'+
        'HotelStudy team \n'+
        'Utter Pradesh'
    };
    transporter.sendMail(mailOptions, function(err) {
    });
       req.flash('info',"Email has been sent")
    res.redirect('/admin/contact/message/'+id+'')
  })
module.exports = route
