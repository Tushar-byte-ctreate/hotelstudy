const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express();
const ejs = require('ejs')
var slugify = require('slugify')


const cookieParser = require("cookie-parser");
const session = require('express-session');  // session middleware
const passport = require('passport');  // authentication
var flash = require('connect-flash');
mongoose.connect('mongodb+srv://iam_tushar:'+ process.env.PASS_WORD+'@cluster0.9uywv.mongodb.net/Blogweb', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{ console.log('db connected')}).catch(err => console.log(err))
const Course = require('./modules/course')
const News = require('./modules/newsH')
const home = require('./route/home')
const user = require('./route/user')  
const company = require('./route/hs')
const CourseArticles = require('./route/course_articles')
const comments = require('./route/comment')
const search = require ('./route/search')
const Admin = require('./route/admin/Admin')
const auth = require('./route/auth')
const userProfile = require('./route/uerProfile')
const news = require ('./route/news/news')
const hstalks = require ('./route/hoteltalks/home')
const fs = require('fs');
const multer = require('multer');
const path = require('path')
var moment = require('moment');
app.locals.moment = require('moment');
app.use('/uploads',express.static(__dirname + './uploads'));
app.use(express.static((__dirname, 'public')));
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/image", express.static(__dirname + "/public/image"));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");




const storage = multer.diskStorage({
       
  destination: (req,file,cb)=>{
cb (null , "./uploads")
  } ,
    filename: (req, file, cb) => {
        cb(null,file.fieldname + '_' + Date.now() 
           + path.extname(file.originalname)); 
          return file;
  }
});
const upload = multer({storage:storage}).single('image');


app.use('/uploads',express.static(__dirname + './uploads'));
app.use(express .urlencoded({extended:true}));
app.use(flash());
app.use(cookieParser());
app.use(express.json())
app.use(session({
    secret:' thisistusharkumarpanchal!@#$%^&*()123456789!@#$%^&*()_+|',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
  }));
  app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});
app.get('/', async(req,res) => {
  const courses = await Course.find({})
  const title = "HotelStudy";
  // res.send(courses)
       res.render('home',{title: "HotelStudy",course:courses,user:req.user,description:""}) 
  })

app.use(userProfile)
app.use(home)
app.use(news)
app.use(auth)
app.use("/hs",company)
app.use(hstalks)
app.use(user);
app.use(Admin)
app.use(CourseArticles)
app.use('/search/post/', search)

app.use(comments)
app.post('/create/news/post', upload, async (req,res)=>{

  const slugT = slugify(req.body.title, {
      replacement: '-',
      strict: true,
      lower:true
  })
  const date = new Date();


  const savingto  = await News.create({
      title:req.body.title,
      slugTitle :slugT,
      image:{
          data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
          contentType: 'image/png'
      },
      username:req.body.uName,
      user :req.body.Uid,
      discription: req.body.discription,
      content : req.body.content,
      type:req.body.type,
      date : date,

  })
try {
    
    req.flash('info',"Post has created successfully")
    res.redirect('/news')
} catch (error) {
  req.flash('error',error.massege)
  res.redirect('/news')
}
})

// app.use((req, res,next)=>{
//   res.render('404',{title:"404",description:"404",user:req.user});
// });



let port = process.env.PORT;
if(port == null || port == ""){
    port = 3000;
}


const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

let io = require('socket.io')(server)

io.on('connection', (socket) => {
  console.log(`New connection: ${socket.id}`)
  // Recieve event
  socket.on('comment', (data) => {
      data.time = Date()
      socket.broadcast.emit('comment', data)
  })

  socket.on('typing', (data) => {
      socket.broadcast.emit('typing', data) 
  })
})