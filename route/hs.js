const route = require ('express').Router();
const Contect = require ('../modules/contectus')
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
    console.log('j')
    res.render('aboutus')
  })
  route.get('/about',(req, res)=>{
    const title = "About" || "HotelStudy"
    res.render('aboutus',{title : title,description:"About Pages"})
})
route.get('/contact/us',(req,res)=>{
    const title = "contact" || "HotelStudy"
    res.render('contactus',{title : title,description:"", message:req.flash('info')})
})
route.get('/terms/condition',(req,res)=>{
  const title = "contact" || "HotelStudy"
  res.render('term',{title:'T&C',description:""})
})
route.get('/privecy-policy/',(req,res)=>{
  const title = "PnP" || "HotelStudy"
  res.render('policy',{title:title,description:""})
})
route.post('/contect/us', async(req,res)=>{
    const data = req.body
    console.log(data)
    const saveData =  await Contect.create(data);
    var mailOptions = {
      to: req.body.email,
      from: 'passwordreset@demo.com',
      subject: 'Contect US',
      text: 'Hi '+req.body.name +' ,\n\n' +
        ' Thanks! for contect us. We will contact to you soon..\n\n'+
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