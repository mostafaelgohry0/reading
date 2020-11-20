var http = require('http');
const express = require('express');
var app = express();
const router = express.Router();
const bodyParser = require('body-parser')
const path = require('path')
const user = require('../models/user.js')
router.use(express.static("./public"));

// use body  parser  and work with express
router.use(bodyParser.urlencoded(
    {extended:true}
));



router.get('/g',(req,res,err)=>{

 //res.sendFile(path.join(__dirname ,"..","public" ,"test.html"));  
 res.send("hi ");
});




module.exports=router;


