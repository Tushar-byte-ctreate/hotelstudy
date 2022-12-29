const route = require('express').Router()

const Hstalk = require('../../modules/hstalk');
route.get('/hoteliers/talks/', async (req,res)=>{

    const hst = await Hstalk.find({})

    res.render('hstalks',{ hst:hst,title:'Hotelier Talks',description:"",user:req.user})
})
route.post('/update/:data/likes',async(req,res)=>{

  if(req.user == "null" ||  req.user == "undefined"){
console.log("no user here")
  }else{
     console.log("user is here")
  }
    //  const id = req.body.postId
    // const data ={
    //   userId: req.body.postId 
    // }                               
    // const putLike = await Hstalk.findOneAndUpdate({_id:id},{$push:{like:data}})
    // try{
    //   const count = putLike.like.count();
    //   console.log(count)
    //   res.send({likes:count})
    // }
    // catch(err){
    //    res.send(err)
    // }
    
    
  })
  route.post('/update/:data/dislikes',(req,res)=>{
    const id = req.body.data
        const data = req.body.postId                                
        console.log(data)
        console.log(id)
        res.send('done')
      })

module.exports = route