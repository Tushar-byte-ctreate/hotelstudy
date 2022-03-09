const route = require ('express').Router();
const Company = require('../../modules/hs')
var slugify = require('slugify')
const adminValidate = require('../middel');

route.get('/admin/company/hs/',adminValidate,async (req,res)=>{

    const pages = await Company.find({})
    
    res.render('admin/company',{pages:pages,error:req.flash('error'),info:req.flash('info')})

})
route.get('/admin/create/company/page',adminValidate,(req,res)=>{

    res.render('admin/a-create',{id:"",data:"ghfH52gj63"})
})
route.post('/admin/create/article/:data',adminValidate,async (req,res)=>{
   
   const slug = slugify(req.body.title, { replacement: '-',strict: true, lower:true })
   console.log(req.body)
   const data = {
       title:req.body.title,
       slug:slug,
       content:req.body.content,
       discription:req.body.discription
   }
   const DataSave = await Company.create(data) //saving data into db 
   try{
    req.flash("info","page add successfully"),res.redirect('/admin/company/hs/')
   } catch (error){
    req.flash("error",error.message), console.log(err),res.redirect('/admin/company/hs/')
   }
})
route.get('/admin/company/pages/delete/:id',adminValidate,async(req,res)=>{
    const id = req.params.id
    const DataDeleting = await Company.findOneAndDelete({_id:id})
    try{
        req.flash("info","Page habe been Deleted")
        res.redirect("/admin/company/hs/")
    } catch (error){
        req.flash("error",error.message)
        res.redirect("/admin/company/hs/")
    }
})
route.get('/admin/company/page/edit/:id',adminValidate,async(req,res)=>{
    const id = req.params.id

    const data = await Company.findOne({_id: id})
console.log(data)
    res.render('admin/a-edit',{cid:"",page:data,dummy:"kjde4554fdsf5d"})
})

route.post('/admin/edit/:id/:cid',adminValidate, async(req,res)=>{
    const id = req.params.id
    const slug = slugify(req.body.title, { replacement: '-',strict: true, lower:true })
    const data ={
        title:req.body.title,
       slug:slug,
       content:req.body.content,
       discription:req.body.discription
    }
    const UpdatingData = await Company.updateOne({_id:id},{$set:data})
    try {
        req.flash('info',"Page has been updated successfully")
        res.redirect("/admin/company/hs/")
    } catch (error) {
        req.flash('error', error.message)
        res.redirect("/admin/company/hs/")
    }

})


module.exports = route