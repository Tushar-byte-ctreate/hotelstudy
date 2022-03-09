const route = require ('express').Router();
const User = require('../modules/user')
const validate = require('./middel')
const cookieParser = require("cookie-parser");


route.get('/login/auth-user', (req,res)=>{
   if( req.query.origin )
   req.session.returnTo = req.query.origin
   else
   req.session.returnTo = req.header('Referer')
   if(!req.isAuthenticated())  return  res.render('log',{error:req.flash('error'),info:req.flash('info'),title:"Login", description:""})
res.redirect('/')

})
route.get('/user/profile/:id',  async (req, res)=>{
   const userId = req.params.id
   const user = await User.findById(userId)
   if(!user) return res.redirect('/login/auth-user')
res.render('userProfile',{user:user,title:"Profile", description:"userprofile"})
})

 
 
 module.exports = route