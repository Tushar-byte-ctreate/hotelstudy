const route = require ('express').Router();
const Course = require('../modules/course')
const Company = require('../modules/hs')
//requiring path and fs modules
var path = require('path');
var fs = require('fs');

route.get('/', async(req,res) => {

const courses = await Course.find({})



const title = "HotelStudy";
    res.render('home',{title: "HotelStudy",course:courses,user:req.user,description:""})
        
    
})



//     var directoryPath = path.join(__dirname, '../views/');

//     //passsing directoryPath and callback function
//     fs.readdir(directoryPath, function (err, files) {
//         //handling error
//         if (err) {
//             return console.log('Unable to scan directory: ' + err);
//         } 
//         //listing all files using forEach
//         files.forEach(function (file) {
//             // Do whatever you want to do with the file
//             console.log(file); 
//         });
//     });

// //joining path of directory 


module.exports = route