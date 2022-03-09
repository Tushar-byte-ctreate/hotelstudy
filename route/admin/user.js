const route = require ('express').Router();

const User = require('../../modules/user')
const adminValidate = require('../middel');

route.get('/user/admin',adminValidate, async(req,res)=>{

     const users = await User.find({})

    res.render('admin/a-users',{users:users,error:req.flash('error'),info:req.flash('info')})
})
route.get('/admin/users/delete/:id', adminValidate,async(req,res)=>{

    const id = req.params.id
    const user = await User.findByIdAndDelete(id);
    try {
        req.flash('info', 'User deleted successfully')
        res.redirect('/user/admin')
    } catch (error) {
        req.flash('error', "Some went wrong, try again later")
        res.redirect('/user/admin')
    }
})
route.get('/admin/user/edit/:id',adminValidate,async (req,res)=>{
    const id = req.params.id;
const  data = {}
    const user = await User.fonOneAndUpdate({id:id},{$set:{}})

    try {
        req.flash('info',"User data has been updated successfully")
        res.redirect('/user/admin')
    } catch (error) {
        req.flash('error',"Something went Wrong")
        res.redirect('/user/admin')
    }
})
route.get('user/profile/:id',adminValidate, async (req,res)=>{
    
})

module.exports = route
