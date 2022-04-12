const route = require ('express').Router();
const fs = require('fs');
const express = require('express');
var slugify = require('slugify')
const multer = require('multer');
const path = require('path')
const imageToBase64 = require('image-to-base64');
const readnews = require('./raednews');

const News = require ('../../modules/newsH')

const User = require ('../../modules/user')
route.use(readnews)

//route.use('/uploads', express.static('uploads'));

// route.use('/uploads',express.static(__dirname + './uploads'));
function uservalidation (req,res,next){
    if(!req.isAuthenticated()){
       return req.flash("error","Login Please"),   res.redirect('/login/auth-user')
     
    }
    return next();
}

route.get('/news',async (req,res)=>{
    const news = await News.find({})
    const newsFilter = news.filter((el)=>{ 
        return el.type === 'public'
    })
    const user = req.user ||{_id:""}
    res.render('news',{user:user, news:newsFilter,title:"News",description:" HotelStudy News will provide hotels news of india"})
})
route.get('/news/edit/hs/:newsid',uservalidation, async (req,res)=>{

  const id = req.params.newsid
  const userid = req.params.uid

  const news = await News.findOne({_id:id})
  const user = await User.findOne({_id:userid})
  try{
res.render('newsedit',{title:"edit",description:"", user:req.user , news:news})
  }catch(error){
req.flash('error',"somethig Went wrong")
res.redirect("/user/profile/"+ id+"")
  }

})
route.post('/news/edit/:id/',uservalidation, async(req,res)=>{
    const id = req.params.id
    const slugT = slugify(req.body.title, { replacement: '-', strict: true,lower:true})
    const date = new Date().toLocaleDateString()
    const data = {
     title:req.body.title,
     discription:req.body.discription,
     type:req.body.type,
     slugTitle: slugT,
     content:req.body.content,
     date:date
    }
  console.log(data)
    const news = await News.updateOne({_id:id},{$set:{title:req.body.title,
        discription:req.body.discription,
        type:req.body.type,
        slugTitle: slugT,
        content:req.body.content,
        date:date}})
    console.log(news)
    try{
req.flash("info","Posts has been changed!")
res.redirect("/user/profile/"+req.body.Uid+"")
    }catch(error){
        req.flash("error",error.message)
        res.redirect("/user/profile/"+req.body.Uid+"")
    }
 })
route.get('/create/news', async (req,res)=>{

    if(!req.isAuthenticated()){
        req.flash('error',"Please login for create a post")
res.redirect('/login/auth-user')
    }else{

    
res.render('creatNews',{user:req.user,title:"News",description:""})}
})
route.get('/news/:slug',async (req,res)=>{
    const slug = req.params.slug
    const news = await News.findOne({slugTitle:slug})

    try {
       
        res.render('readnews',{title:news.title ,description:news.discription, user:req.user,news:news})
    } catch (error) {
        res.send(error)
    }

})
route.get("/news/post/delete/:id",uservalidation , async (req,res)=>{
    const id = req.params.id

const news = await News.findOneAndDelete({_id:id})
console.log(news)
try{
    req.flash('info',"posts has been deleted")
    res.redirect('back')
}catch(error){
    req.flash('error',error.message)
    res.redirect('back')
}
})


// news search
route.get('/search/news/query/', async (req,res)=>{
    var url =new URL( req.protocol + '://' + req.get('host') + req.originalUrl)
    const query = url.searchParams.get('search_type')
    console.log(query)

    const news = await News.find({title: {$regex :query ,$options: 'i'}})
    const count = news.length
    if (news === undefined || news.length === 0) {

        res.render('search',{searchResult:[],user:req.user,title:"search",description:"",count:count})
      }else{
        res.render('search',{searchResult:news,user:req.user,title:"search",description:"",count:count})
      }
})
module.exports = route