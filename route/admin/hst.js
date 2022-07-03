const router= require('express').Router();
const slugify = require('slugify')
const Hstalk = require('../../modules/hstalk');



router.get('/admin/hst', async(req,res)=>{
    const hst = await Hstalk.find({})
    res.render('admin/hst', {hst:hst,user:req.user,error:req.flash('error'),info:req.flash('info'),search : "shst"})
})
router.get('/admin/hst/create',(req,res)=>{
    const action = "create"
    const hst = {
        _id:''
    }
    res.render('admin/ediths', { hst:hst,action:action,user:req.user,error:req.flash('error'),info:req.flash('info'),search : "shst"})
})
router.post('/admin/hst/create',async (req,res)=>{
   const data = req.body
const hst = await Hstalk.create(data)
console.log(hst)
try {
    req.flash('info',"HST created ")
    res.redirect('/admin/hst')
} catch (error) {
    req.flash('error',error.message)
    res.redirect('/admin/hst')
}
    
})
router.get('/admin/hst/edit/:id', async(req, res)=>{
    const id = req.params.id
    const findhst = await Hstalk.findOne({_id:id})
    const action = "edit"
try {
    req.flash('info',"done")
    res.render('admin/ediths',{hst:findhst, action:action, user:req.user,error:req.flash('error'),info:req.flash('info'),search : "shst"})
} catch (error) {
    req.flash('error',error.message)
 res.redirect('back')
}
})
router.post('/admin/hst/edit/:id', async(req, res)=>{
    const id = req.params.id
    const data = req.body
    const findhst = await Hstalk.updateOne({_id:id},{$set:{data}})
try {
    req.flash('info',"Data has been updated")
   res.redirect('/admin/hst')
} catch (error) {
    req.flash('error',error.message)
 res.redirect('back')
}
})

router.get('/admin/hst/delete/:id',async (req,res)=>{
    const id = req.params.id
    const findData = await Hstalk.findOneAndDelete({_id:id})
    try{
        req.flash('info','Post has been deleted')
        res.redirect('back')
    }catch(error){
        req.flash('error',error.massege)
        res.redirect('back')
    }
})



module.exports = router