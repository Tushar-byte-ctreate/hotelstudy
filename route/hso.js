const route = require ('express').Router();

route.get('/hs/about',(req,res)=>{
    console.log('j')
    res.render('aboutus')
  })
// route.get('/about',(req, res)=>{
   
//     res.render('aboutus')
// })
route.get('/contact/us',(req,res)=>{
    res.render('contactus')
})


module.exports = route