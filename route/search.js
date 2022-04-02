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
    
    const article= await Course.find({
        articles: {
          $elemMatch: {
            title: {
              $regex: query,
              $options: "i"
            }
          }
        }
      },
      {
        articles: {
          $filter: {
            input: "$articles",
            cond: {
              $regexMatch: {
                input: "$$this.title",
                regex: query,
                options: "i"
              }
            }
          }
        }})
    
 
if (article === undefined || article.length === 0) {

  res.render('search',{searchResult:[],user:user,title:"search",description:""})
}else{


  const search =   article.forEach(function(article) {

     const data =  article.articles
     console.log(data); 
     res.render('search',{searchResult:data,user:user,title:"search",description:""})
  })
}

    // if(!search) return res.render('search',{user:user,title:"search",description:""})
   
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