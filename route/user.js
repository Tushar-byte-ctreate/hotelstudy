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

   if(req.isAuthenticated()){
      const userId = req.params.id
      const user = await User.findOne({_id:userId})
      if(!user) return res.redirect('/login/auth-user')
   res.render('userProfile',{user:user,title:"Profile", description:"userprofile" ,error:req.flash('error'),info:req.flash('info')})
   }else{
      req.flash('error',"Please login first")
      res.redirect('/login/auth-user')
   }
  
})

 route.post('/user/profile/edit/:id', async (req,res)=>{

  
    const id = req.params.id
    const updateData = await User.findByIdAndUpdate(id,{$set:{name:req.body.name}},{new:true})
    
    try {
       
       req.flash('info',"Name has been updated successfully")
       res.redirect('/user/profile/'+id+'')
    } catch (error) {
      req.flash('error',"Something went wrong with updating")
      res.redirect('/user/profile/'+id+'')
    }
 })
 
 module.exports = route