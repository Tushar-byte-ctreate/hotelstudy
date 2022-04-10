const route = require('express').Router();


const Course = require('../modules/course')
const Comment = require('../modules/comment')
const User = require('../modules/user')


route.get('/courses-list/', async(req,res)=>{
    const course = await Course.find({})

    const fnb = course.filter((value)=>{
        return value.tags == "F and B"
    })
    const hk = course.filter((value)=>{
        return value.tags == "hk"
    })||""
    const fo = course.filter((value)=>{
        return value.tags == "fo"
    }) ||""

    const fp = course.filter((value)=>{
        return value.tags == "fp"
    })||""
    const un = course.filter((value)=>{
        return value.tags == "univers"
    })||""
    console.log(fnb)

    res.render('course_list',{title:'courses',fnb:fnb,hk:hk,fo:fo,univers:un,fp:fp ,description:"All courses of HotelStudy"})
})



route.get('/:slugCourse', async(req,res)=>{
const courseslug = req.params.slugCourse
console.log(courseslug)
const course = await Course.findOne({slugCourse: courseslug})
const art = course.articles[0]
console.log(art)
res.redirect('/'+courseslug+'/'+art.slugtitle+'')

})


 
route.get('/:courseslug/:articleslug', async (req,res)=>{
    const cslug = req.params.courseslug
    const course = await Course.findOne({slugCourse: cslug})
    const aslug = req.params.articleslug
    const cid = course._id
    const articles = course.articles
    const userId = ''
    // const comments = await Comment.find({postId:art._id})
    // console.log(comments)
//  const admin = await User.findById(userId)
    const article = articles.find((value)=>{
            return value.slugtitle == aslug
    })
    console.log(article._id)
    const comments = await Comment.find({postId:article._id})
 console.log(comments ,'comment')
    const i = articles.indexOf(article)
    const next = articles[i+1]
    const previous = articles[i-1]
const user = req.user || {
    username:'',
    name:''
}
console.log(user)
const title = article.title || HotelStudy

    try {
        res.render('artical',{
          course:course, 
          articles:articles, 
          article:article,
          next:next,
          previous:previous,
          admin :'',
          user:user,
          username: user.username,
          comments:comments,
          title :title,
          description:article.discription
          })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

route.get('/search/data/:id',(req,res)=>{
    const id = req.body.params
    console.log(id)
    const data = Course.find({'_id':{$elemMatch:{$elemMatch:{$in:[id]}}}})
      console.log(data)
})
module.exports = route