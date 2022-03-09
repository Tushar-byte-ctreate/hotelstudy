const route = require ('express').Router();
const Comment = require('../modules/comment')


route.post('/do-comment/:courseslug/:articleslug', async(req,res)=>{
const courseslug = req.params.courseslug;
const articleslug = req.params.articleslug;
    if(!req.user){
        res.send('you can not post the comment')
    }else{
        const user = req.user
        const comments = {
            postId:req.body.postId,
            admin: req.body.adminId,
            comment:req.body.comment,
            name:req.user.name,
            email:req.user.username
        }
        console.log( comments)
        const comment = await Comment.create(comments)

        res.redirect("/"+ courseslug +"/"+articleslug+"" )
    }
 
      
})
route.get('/comment/delete/:id', async(req,res) => {
    const id = req.params.id
const comment = await Comment.findByIdAndDelete(id)
res.redirect(req.header('Referer') || '/');
if (req.session.returnTo) {
  delete req.session.returnTo
}
})
route.post('/api/comments', async (req,res)=>{
   const data = req.body
        console.log(data)
        const user = req.user ||{
            username:''
        }

      const response =await  Comment.create({
            postId:req.body.postId,
            admin: req.body.adminId,
            comment:req.body.textarea,
            name:req.user.name,
            email:req.user.username
        })
        
var userEmail = user.username
       const deleteBtn = `text ${userEmail === response.email ? '<a href="">Delete</a>' : ''}` ;
    const renderData = (response, deleteBtn)
    console.log(renderData)
            res.send(renderData)    
})




route.post('/comment', (req,res)=>{

    const user = req.user
        const comments = {
            postId:req.body.postId,
            admin: req.body.adminId,
            comment:req.body.comment,
            name:req.user.name,
            email:req.user.username
        }
        console.log( comments)
        const comment =  Comment.create(comments)
    res.json({comment})
})
route.get('/api/comments',(req,res)=>{
  
    console.log( 'url' )
})
route.put('/edit/comment/:id',(req,res)=>{

})
route.delete('/delete/comment/:id',(req,res)=>{
    
})

module.exports = route