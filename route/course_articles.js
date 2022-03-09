const route = require('express').Router();


const Course = require('../modules/course')
const Comment = require('../modules/comment')
const User = require('../modules/user')


route.get('/courses-list/',(req,res)=>{
    res.render('course_list',{title:'courses',description:"All courses of HotelStudy"})
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

module.exports = route