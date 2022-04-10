const route = require ('express').Router();
const Contect = require('../../modules/contectus')


route.get('/admin/contact/us/page', async (req,res)=>{

    const data = await Contect.find({})
    try{
        res.render("admin/contactus",{data:data,user:req.user,error:req.flash('error'),info:req.flash('info')})
    }catch(error){
        req.flash('error',error.message)
        res.redirect('/admin/contact/us/page')
    }
})

module.exports = route
