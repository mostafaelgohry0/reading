var http = require('http');
const express = require('express');
var app = express();
const router = express.Router();
const bodyParser = require('body-parser')
const path = require('path')
const articles = require('../models/articles')
router.use(express.static("../public"));

;
const cookieParser = require("cookie-parser");



router.use(cookieParser());




// use body  parser  and work with express
router.use(bodyParser.urlencoded(
    {extended:true}
));











router.get('/' ,(req,res,err)=>{

    articles.find({},function (err,articlesData) {

         //console.log(users);
         res.render("articles.ejs",{data:articlesData});
        // res.render("data.ejs",{checkSign:"hallo"});
  
    });


    //res.render("data.ejs",{data:users});
    //res.render("data.ejs",{checkSign:"hallo"});
});




module.exports=router;


