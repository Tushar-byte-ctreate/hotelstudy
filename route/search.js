const route = require('express').Router();


const Course = require('../modules/course')

route.get('/serach',(req,res)=>{
    res.send(' you are searching now')
})
route.get('/query/',async (req,res) => {
    var url =new URL( req.protocol + '://' + req.get('host') + req.originalUrl)
    const query = url.searchParams.get('search_type')
    console.log(query)
    const user = req.user ||{
        username:'',
        name :''
    }
    
    const article= await Course.find({})
   console.log(article.articles )
    

  const search =   article.find((value)=>{
         return value.articles.title === query
    })
   
  
    console.log(search)
    if(!result) return res.render('search',{user:user})
    res.render('search',{searchResult:result,user:user})
})
route.get('/:id',async(req, res) => {
    // const id = req.params.id
    // const article = await Article.findById(id);
    // const course = await Course.findById({_id:article.courseId})

    // res.redirect('/'+ course.slugCourse +'/'+ article.slug + '')
})
route.get('/about ' ,(req, res)=>{
    console.log('data')
    res.send('hello')
})
module.exports = route