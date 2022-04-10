module.exports = function validation(req,res,next){

    if(!req.isAuthenticated()) {
        return res.redirect('/login/auth-user')
    }
next()       
}


module.exports = function adminValidate(req, res, next){
   const user = req.user
   
  
    if(!req.isAuthenticated()) {
        return req.flash('error',"You cannot access Admin page") ,res.redirect('/login/auth-user') 
    }else if(user.admin == 'true'){
        return next();
    }
   
     res.redirect('/')
    
}


module.exports = function childValidate(req, res, next){
    const user = req.user
    
     if(!req.isAuthenticated()) {
         return req.flash('error',"You cannot access Admin page") ,res.redirect('/login/auth-user') 
     }else if(user.admin == "child"){
   
        return  next();
     }
     res.redirect('/')
   
 }
// module.exports = auth.restrict = function(req, res, next){
//     if (!req.session.userid) {
//         req.session.redirectTo = '/account';
//         res.redirect('/login');
//     } else {
//         next();
//     }
// }