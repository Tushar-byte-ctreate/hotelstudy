const route = require('express').Router()


route.get('/hoteliers/talks/',(req,res)=>{
    res.render('hstalks',{title:'Hotelier Talks',description:"",user:req.users})
})

module.exports = route