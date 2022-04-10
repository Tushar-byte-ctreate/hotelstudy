const route = require ('express').Router();
const User = require('../modules/user')
const passportLocalMongoose = require('passport-local-mongoose');
const cookieParser = require("cookie-parser");
const session = require('express-session');  // session middleware
const passport = require('passport');  // authentication
var flash = require('connect-flash');
const LocalStrategy = require('passport-local').Strategy;
const nodemailer = require("nodemailer");
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const async = require('async');

route.use(session({
    secret: "thisistusharkumarpanchal!@#$%^&*()123456789!@#$%^&*()_+|",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
  }));
  route.use(passport.initialize());
route.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
route.use(flash());
passport.serializeUser(function (user, done) {
  done(user.Id); // the user id that you have in the session
});
route.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});


passport.serializeUser(function(user, done) {
  done(null, user.id);
});
 
passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({ username: username }, function(err, user) {
    if (err) return done(err);
    if (!user) return done(null, false, { message: 'Incorrect username.' });
    console.log(user);
    User.comparePassword(password, function(err, isMatch) {
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
    });
  });
}));
passport.use(new LocalStrategy(User.authenticate()));


const transporter = nodemailer.createTransport({
  host: "hotelstudy.com",
 service:'gmail',
  auth: {
    user:process.env.USER_EMAIL, // generated ethereal user
    pass: process.env.USER_PASS, // generated ethereal password
  },
});

route.post("/sign-up/user", (req, res) => {


 const token = crypto.randomBytes(20).toString('hex')

  console.log(token)
    console.log(req.body)
    User.register({username:req.body.username, type:req.body.type, name:req.body.name ,token:token, tokenExpires:Date.now() + 3600000}, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            console.log(err)
        }
        passport.authenticate("local")(req, res, function(info){
          console.log(info)
          req.logout();

          var mailOptions = {
            to: user.username,
            from: '"HotelStudy" <hotelstudy.noreply>',
            subject: 'Email Vaerify',
            text: 'You are receiving this because you (or someone else) have requested the create  account on HotelStudy.\n\n' +
              'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
              'https://' + req.headers.host + '/user/Verify/' + token + '\n\n' +
              'If you did not request this, please ignore this email and your password will remain unchanged.\n'
          };
          transporter.sendMail(mailOptions, function(err) {
            console.log('email')
            console.log(err, 'done');
          });

          req.flash("info", "We sent an email to you, please verify your email address"  + user.name +" ")
          res.redirect('/login/auth-user')
        });
    });
   
  });
  route.get('/user/verify/:token',async (req, res)=>{
    const token = req.params.token;

    const user = await User.findOneAndUpdate({ token: req.params.token} , {$set:{verify:'true'}})
    console.log(user)

    if(!user) {
     
      res.render('verify',{title:"verify",description:"" ,done:'error'})
    } else {
      res.render('verify',{title:"verify",description:"",done:"123"})
     
    }
  })
  route.post("/login/user",async (req,res)=>{
  
const user = await User.findOne({username:req.body.username});
console.log(user)

if(!user  ) {

  req.flash('error','Username or Password invalid ')
    res.redirect('/login/auth-user')

}else{
  if(user.verify === false)
  {
    req.flash('error','Please Verify your email first ')
    res.redirect('/login/auth-user')
  }
  
   
else {

      req.session.loggedin = true 
      const user= new User({
          username : req.body.username,
          password : req.body.password
      })
      req.login(user, (err)=>{
       if(err){
           console.log(err)
       }else{
        passport.authenticate("local")(req, res, function(){
         console.log(user)
         if(user.admin == "true") return res.redirect('/Ad-min')
         let returnTo = '/'
         if (req.session.returnTo) {
           returnTo = req.session.returnTo
           delete req.session.returnTo
         }
         res.redirect(returnTo);

          });
       }
   
  }
  )
  
} }
})
route.get('/logout' ,(req,res)=>{
  req.session.destroy()
  req.logout();

res.redirect(req.header('Referer') || '/');
if (req.session.returnTo) {
  delete req.session.returnTo
}
})



// })

route.post('/forgot/password/',  (req,res)=>{

  async.waterfall([
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString('hex');
          done(err, token);
        });
      },
      function(token, done) {
          User.findOne({ username: req.body.username }, function(err, user) {
            if (!user) {
              req.flash('error', 'No account with that email address exists.');
              return res.redirect('/login/auth-user/');
            }
    
            user.token = token;
            user.tokenExpires = Date.now() + 3600000; // 1 hour
    
            user.save(function(err) {
              done(err, token, user);
            });
          });
        },
      function(token, user, done) {
        console.log(user +"one")
        var mailOptions = {
          to: user.username,
          from: '"HotelStudy" <hotelstudy.noreply>',
          subject: 'Password Reset',
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'https://' + req.headers.host + '/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        transporter.sendMail(mailOptions, function(err) {
          console.log('email')
          req.flash('info', 'An e-mail has been sent to ' + user.username + '.');
          done(err, 'done');
        });
      }
    ], function(err) {
      if (err) console.log(err) ;
      res.redirect('/login/auth-user')
     ;
    });


})
route.get('/reset/:token', function(req, res) {

  const token = req.params.token
  console.log(token +'one token')
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
        
      req.flash('error', 'Password reset token is invalid or has expired.');
     
      return res.redirect('/login/auth-user');
     
    }else{console.log(user + "two")
  
    res.render('changePass', {
      token: token,
      title:"Password",
      description:"password changed",
      massege:req.flash('info')
    });}

  });
});
route.post('/reset/', async function(req, res) {
  
  const token = req.body.token;
 


if(!req.body.password == req.body.rePassword ){
  req.flash('error',"Password does not match")
  res.redirect('back')
   }else{
     const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } })
     try {
       await user.setPassword(req.body.password)
       user.resetPasswordToken = undefined;
       user.resetPasswordExpires = undefined;
       await user.save()
       
       var mailOptions = {
        to: user.username,
        from: '"HotelStudy" <hotelstudy.noreply>',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.username + ' has just been changed.\n'
      };
      transporter.sendMail(mailOptions, function(err) {
        req.flash('info', 'Success! Your password has been changed.');
       
      });

      res.redirect('/login/auth-user')

       
     } catch (error) {
       console.log(error)
       req.flash("error",'something went wrong')
       res.redirect('/login/auth-user')
     }
  
    }
    

});


  module.exports = route 
