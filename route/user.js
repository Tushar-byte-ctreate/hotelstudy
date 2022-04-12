const route = require ('express').Router();
const User = require('../modules/user')
const News = require('../modules/newsH')
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
   if(req.isAuthenticated()){
      
      const user = await User.findOne({_id:userId})
      const news = await News.find({user:userId})
      
      if(!user) return res.redirect('/login/auth-user')
   res.render('userProfile',{user:user,news:news,title:"Profile", description:"userprofile" ,error:req.flash('error'),info:req.flash('info')})
   }else{
      req.flash('error',"Please login first")
      res.redirect('/login/auth-user')
   }
  
})

 route.post('/user/profile/edit/:id', async (req,res)=>{

  
    const id = req.params.id
    const updateData = await User.findByIdAndUpdate(id,{$set:{name:req.body.name,username:req.body.username,type:req.body.type}},{new:true})
    
    try {
       
       req.flash('info',"Name has been updated successfully")
       res.redirect('/user/profile/'+id+'')
    } catch (error) {
      req.flash('error',"Something went wrong with updating")
      res.redirect('/user/profile/'+id+'')
    }
 })
 
 module.exports = route