const route = require ('express').Router();
const Contect = require ('../modules/contectus')
const Company = require ('../modules/hs')
var flash = require('connect-flash');
route.use(flash());
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "hotelstudy.com",
 service:'gmail',
  auth: {
    user:process.env.USER_EMAIL, // generated ethereal user
    pass: process.env.USER_PASS, // generated ethereal password
  },
});

route.get('/hs/about',(req,res)=>{
    
    res.render('aboutus')
  })
  route.get('/about', async(req, res)=>{
    const about = await Company.findOne({title:"About Us"})


    const title = "About" || "HotelStudy"
    res.render('aboutus',{title : title,description:"About Pages",data:about,user:req.user})
})
route.get('/contact/us',(req,res)=>{
    const title = "contact" || "HotelStudy"
    res.render('contactus',{title : title,description:"",user:req.user, message:req.flash('info')})
})
route.get('/terms/condition',async(req,res)=>{
  const tnc = await Company.findOne({title:"Terms and Condition"})
  const title = "contact" || "HotelStudy"
  res.render('aboutus',{title:'T&C',description:"",data : tnc,user:req.user})
})
route.get('/privecy-policy/',async(req,res)=>{
  const title = "privecy policy" || "HotelStudy"
  const pp = await Company.findOne({title:"Privacy Policy"})
  res.render('aboutus',{title:title,description:"",data:pp,user:req.user})
})
route.get('/experts/',async(req,res)=>{
  const title = "Experts" || "HotelStudy"
  const pp = await Company.findOne({title:"Experts"})
  res.render('aboutus',{title:title,description:"",data:pp,user:req.user})
})
route.post('/contect/us', async(req,res)=>{
  const date = new Date().toLocaleDateString();
    const data ={
      name:req.body.name,
      email:req.body.email, 
      message:req.body.message,
      date:date
    };
                            
    console.log(data)
    const saveData =  await Contect.create(data);
    var mailOptions = {
      to: req.body.email,
      from: '"HotelStudy"<hotelstudy.noreply>',
      subject: 'Contect US',
      text: 'Hi '+req.body.name +' ,\n\n' +
        ' Thanks! for contect us. We will contact to you soon..\n\n'+
        'Regarding... \n.'+
        'HotelStudy team \n'+
        'Utter Pradesh'
    };
    transporter.sendMail(mailOptions, function(err) {
    });
    var mailOptions = {
      to: "thisistusharkumar@gmail.com",
      from: '"HotelStudy"<hotelstudy.noreply>',
      subject: 'Contect US['+req.body.name+']',
      text: 'Hi '+req.body.name +' just fill the form ,\n\n' +
        ' his/her email address is ' + req.body.email+'\n\n'+
        ' message ' + req.body.message+'\n\n'+
        'Regarding... \n.'+
        'HotelStudy team \n'+
        'Utter Pradesh'
        
    };
    transporter.sendMail(mailOptions, function(err) {
    });
    console.log(saveData)
      req.flash('info',"Form submitted")
      let returnTo = 'back'
      res.redirect(returnTo);
})

module.exports = route