const route = require('express').Router()

const Hstalk = require('../../modules/hstalk');
route.get('/hoteliers/talks/', async (req,res)=>{

    const hst = await Hstalk.find({})

    res.render('hstalks',{ hst:hst,title:'Hotelier Talks',description:"",user:req.user})
})
route.post('/update/likes',(req,res)=>{
    const data = req.body
    console.log(data)
    res.send('done')
  })

module.exports = route