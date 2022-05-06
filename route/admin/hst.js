const router= require('express').Router();
const slugify = require('slugify')
const Hstalk = require('../../modules/hstalk');



router.get('/admin/hst', async(req,res)=>{
    const hst = await Hstalk.find({})
    res.render('admin/hst', {hst:hst,user:req.user,error:req.flash('error'),info:req.flash('info')})
})
router.get('/admin/hst/create',(req,res)=>{
    const action = "create"
    res.render('admin/ediths', {action:action,user:req.user,error:req.flash('error'),info:req.flash('info')})
})
router.post('/admin/hst/create',async (req,res)=>{
   const data = req.body
const hst = await Hstalk.create(data)
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
    const findhst = await Hstalk.findone({_id:id})
try {
    req.flash('info',"done")
    res.render('admin/hstedit',{hst:findhst, user:req.user,error:req.flash('error'),info:req.flash('info')})
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



module.exports = router