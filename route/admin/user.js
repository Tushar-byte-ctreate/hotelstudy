const route = require ('express').Router();

const User = require('../../modules/user')
const adminValidate = require('../middel');

route.get('/user/admin',adminValidate, async(req,res)=>{

    const user_name = req.user.username 
    if(user_name == "thisistusharkumar@gmail.com"){
        const users = await User.find({})

        res.render('admin/a-users',{users:users,error:req.flash('error'),info:req.flash('info'),user:req.user})
    }else{
        

    res.render('admin/a-users',{users:[],error:req.flash('error'),info:req.flash('info'),user:req.user})
    }
     
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
route.get('/admin/user/edit/:id',async(req,res)=>{
    const id = req.params.id;
    const uedit = await User.findById(id)
    console.log(uedit)
const uEdit ={
    _id:uedit._id,
    admin:uedit.admin,
    name:uedit.name
}
    try{
        res.render('admin/userEdit',{uEdit:uEdit,user:req.user})
    } catch(error){
        req.flash('error',"something went wrong")
        res.redirect('/user/admin')
    }
})
route.post('/admin/edit/auth/user/:id',adminValidate,async (req,res)=>{
    const id = req.params.id;
   
const  data = req.body

    const user = await User.updateOne({_id:id},{$set:{admin:req.body.admin}})

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
