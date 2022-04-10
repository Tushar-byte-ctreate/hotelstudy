const route = require ('express').Router();
const fs = require('fs');
const express = require('express');
var slugify = require('slugify')
const multer = require('multer');
const path = require('path')
const imageToBase64 = require('image-to-base64');
const readnews = require('./raednews');

const News = require ('../../modules/newsH')
route.use(readnews)

//route.use('/uploads', express.static('uploads'));
route.use('/uploads',express.static(path.join(__dirname, './uploads')));
// route.use('/uploads',express.static(__dirname + './uploads'));


route.get('/news',async (req,res)=>{


    const news = await News.find({})

    const newsFilter = news.filter((el)=>{ 
        return el.type === 'public'
    })
 
    console.log(newsFilter)
    res.render('news',{user:req.user, news:newsFilter,title:"News",description:" HotelStudy News will provide hotels news of india"})
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
        console.log(news)
        res.render('readnews',{title:news.title ,description:news.discription,user:req.user,news:news})
    } catch (error) {
        res.send(error)
    }

})

module.exports = route