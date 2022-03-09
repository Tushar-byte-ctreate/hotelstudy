module.exports = function validation(req,res,next){

    if(!req.isAuthenticated()) {
        return res.redirect('/login/auth-user')
    }
next()       
}
module.exports = function adminValidate(req, res, next){
   const user = req.user
   const admin = req.admin
   console.log(user,"user")
    if(!req.isAuthenticated()) {
        return req.flash('error',"You cannot access Admin page") ,res.redirect('/login/auth-user') 
    }else if(user.admin == 'false'|| !user.admin == "true"){
       return res.redirect('/')
    }
    next();
}
// module.exports = auth.restrict = function(req, res, next){
//     if (!req.session.userid) {
//         req.session.redirectTo = '/account';
//         res.redirect('/login');
//     } else {
//         next();
//     }
// }