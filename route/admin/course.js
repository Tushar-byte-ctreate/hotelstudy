const route = require ('express').Router();

const Courses = require('../../modules/course')
var slugify = require('slugify')
var moment = require('moment'); // require
const adminValidate = require('../middel');

route.get('/course/list/admin',adminValidate,(req,res)=>{
    console.log(req.user)
    const user = req.user._id

    Courses.find({ admin:user}).then((course)=>{
     
        res.render('admin/a-course',{course:course,user:req.user,title:"Admin",description:"",error:req.flash('error'),info:req.flash('info')})
    }).catch((err)=>{
        console.log(err)
        res.redirect('/admin-home')   
})
})
route.get('/delete/admin/:id', adminValidate,async(req,res)=>{
    const id= req.params.id
  const deleteCourse= await Courses.findOneAndDelete({_id:id})
  try {
    console.log(deleteCourse)
    req.flash('info',"Course Delete Successfully")
    res.redirect('/course/list/admin')
} catch (error) {
    console.log(error)
    req.flash('info',"Some Thing went wrong")
    res.redirect('/course/list/admin')
}
})
route.post('/admin/create/course',adminValidate, async(req,res)=>{
   
    const user = req.user._id
  
    const data = {
        name:req.body.name,
        tags:req.body.tags,
        admin:user,
        discription:req.body.discription
    }
 
    console.log(data,{admin:user})
    await Courses.create(data)

try{
   req.flash('info',"Book has been Created")
   res.redirect('/course/list/admin')

} catch(err){
    req.flash('error',"something went wrong")
    res.redirect('/course/list/admin')
 
}

})
// edit the course 
route.get('/admin/edit/book/:id',adminValidate,async (req,res)=>{
    const id = req.params.id
    console.log(id)
   const book = await Courses.findById({_id:id})

   const data = {
       _id:book._id,
       name:book.name,
       tags:book.tags,
       discription:book.discription
   }

  
    try{
      res.render("admin/courseEdit",{book :data ,user:req.user})
     
     } catch(err){
         req.flash('error',"something went wrong")
         res.redirect('/course/list/admin')
      
     }
})
route.post('/admin/edit/book/:id',adminValidate, async (req,res)=>{
    const id = req.params.id
    const data = req.body
  await Courses.updateOne({_id:id},{$set:{data}})
  try{
    req.flash('info',"Book has been updated")
    res.redirect('/course/list/admin')
 
 } catch(err){
     req.flash('error',"something went wrong")
     res.redirect('/course/list/admin')
  
 }
})
route.get('/admin/course/:id',adminValidate, async (req,res)=>{
    const id = req.params.id
    const course = await Courses.findOne({_id:id}) 
try {
    res.render('admin/a-page', {course: course,user:req.user,pages: course.articles,error:req.flash('error'),info:req.flash('info')})   
} catch (error) {
    req.flash('error', error.message)
    res.redirect('/course/list/admin')
}
})
route.get('/admin/page/delete/:cid/:pid',adminValidate, async function(req, res) { 
const courseid = req.params.cid
const id = req.params.pid
const data = await Courses.updateOne({_id:courseid},{$pull:{articles:{_id:id}}})
try {
    req.flash('info',"Page has delete successfully")
    res.redirect('/admin/course/'+ courseid+'') 
} catch (error) {
    req.flash('error',error.message)
    res.redirect('/admin/course/'+ courseid+'') 
}      
})
route.get('/admin/create/:id/',adminValidate,(req,res)=>{
    const courseId = req.params.id

    res.render('admin/a-create',{id: courseId,data:"",user:req.user,error:req.flash('error'),info:req.flash('info')})
})
route.post('/admin/create/article',adminValidate, async (req,res)=>{
    const slugT = slugify(req.body.title, {
        replacement: '-',
        strict: true,
        lower:true
    })
    const date = new Date()
    const blogData = {
        title:req.body.title,
        content:req.body.content,
        discription:req.body.discription,
       courseId:req.body.courseId,
       slugtitle:slugT,
       date : date
    }
    const id = req.body.id
    console.log(blogData)
       const article =  await Courses.updateOne({_id:req.body.courseId},{$push:{articles:blogData}})
         try {
             console.log(article)
             req.flash('info',"page has been created")
             res.redirect('/admin/course/'+req.body.courseId+'')
         } catch (error) {
             console.log(error)
             req.flash('error',error.message)
             res.redirect('/admin/course/'+req.body.courseId+'')
         }
})
route.get('/admin/edit/page/:cid/:pid',adminValidate,async(req,res)=>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    const articles = await Courses.findById({_id:cid})
    const arry = articles.articles
    const article = arry.find((value)=>{
        return value._id == pid
})
res.render('admin/a-edit',{page:article,user:req.user,cid:cid,title:"Admin",description:"",dummy:''})
})

route.post('/admin/edit/:id',adminValidate, async(req,res)=>{
    const id = req.params.id 
    const slugT = slugify(req.body.title, { replacement: '-', strict: true,lower:true})
    const date = new Date().toLocaleDateString()
    const data ={
        title:req.body.title,
        discription: req.body.discription,
        content:req.body.content,
       slugtitle:slugT,
       date:date
    }
    const courseid = req.body.courseId
    console.log(courseid)
    const query = { _id:courseid, 'articles._id':id}
    const documents = { $set:{ 'articles.$.title':req.body.title, 'articles.$.discription':req.body.    discription, 'articles.$.content':req.body.content}}
    const updatingData = await Courses.updateOne(query,documents)
    .then((data)=>{
        console.log(data)
        req.flash('info','Page has been updated')
        res.redirect('/admin/course/'+courseid+'')

    }).catch((err)=>{
        req.flash('error',err.message)
        res.redirect('/admin/course/'+ courseid +'')
    })
})
module.exports = route

