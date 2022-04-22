const route = require ('express').Router();
const User = require('../modules/user')
const News = require('../modules/newsH')

route.get('/user/profile/public/:id/:username/',  async (req, res)=>{
    const userId = req.params.id

       console.log(req.params.username)
       const user = await User.findOne({_id:userId})
       const news = await News.find({user:userId})
       
       const newsFilter = news.filter((el)=>{ 
        return el.type === 'public'
    })
       
    res.render('userPublic',{userProfile:user,news:newsFilter,title:user.name, description:"I am "+ user.name+"" ,user:req.user,error:req.flash('error'),info:req.flash('info')})
    
    
   // http://localhost:3000/user/profile/public/6259229c6ea9c6745292e9f5/
    
   //http://localhost:3000/user/profile/public/6259229c6ea9c6745292e9f5/Sargam%20Panchal
 })

module.exports = route