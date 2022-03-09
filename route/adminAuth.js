const route = require ('express').Router();


route.get('/company-about',(req,res)=>{
  console.log('j')
  res.render('aboutus')
})

route.get('/contact/us',(req,res)=>{
  res.render('contactus')
})


module.exports = route