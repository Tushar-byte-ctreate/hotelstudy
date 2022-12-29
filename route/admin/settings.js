const route = require ('express').Router();
const Company = require('../../modules/hs')
var slugify = require('slugify')
const adminValidate = require('../middel');
const fs = require('fs')
const path = require('path');
const { json } = require('express');

route.get('/admin/settings',(req,res)=>{
    var directoryPath = path.join(__dirname, '.././views');

        //passsing directoryPath and callback function 
        fs.readdir(directoryPath, function (err, files) {
            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            } 
            //listing all files using forEach
            files.forEach(function (file) {
                // Do whatever you want to do with the file
                console.log(file); 
            });
        });
})

// route.get('/admin/settings',(req,res)=>{
//     const data =[
//     {
//         name: "Header",
//         value:"header"
//     },
//     {name:"Footer",
//         value:"footer"
//     }
// ]
//     res.render('admin/settings',{data :data,user:req.user,search:'settings',title:'Admin | Settings',discription:"admin settings",error:req.flash('error'),info:req.flash('info')})
// })
route.get('/admin/editheader/:data',(req, res)=>{
    const file = req.params.data

    fs.readFile('views/'+file+'.ejs','utf-8',  function (err,data) {
       if(err) return console.log(err)
        res.render('admin/editHeader',{file:data, action:file,user:req.user,search:'settings',title:'Admin | Settings',discription:"admin settings",error:req.flash('error'),info:req.flash('info')})
    })
})
route.post('/admin/editheader/:data',(req, res)=>{
    const file = req.params.data
    const data = req.body.fileData
    console.log(data);
    fs.writeFile('views/'+ file +'.ejs', data, 'utf-8',function (err) {
        if (err) return req.flash("error", err.message) ,res.redirect('back')

        console.log('Saved!') , req.flash('info',"file has been changed"),res.redirect('/admin/settings');})
})






module.exports = route