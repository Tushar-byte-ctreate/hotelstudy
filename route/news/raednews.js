const route = require ('express').Router();



route.get('/news/raed',async (req,res)=>{
    res.render('readnews',{user:req.user,title:"News",description:" HotelStudy News will provide hotels news of india"})
})

module.exports = route