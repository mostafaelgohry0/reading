var http = require('http');
const express = require('express');
var app = express();
const router = express.Router();
const bodyParser = require('body-parser')
const path = require('path')
const user = require('../models/user.js')
router.use(express.static("../public"));


const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");



router.use(cookieParser());




// use body  parser  and work with express
router.use(bodyParser.urlencoded(
    {extended:true}
));










function isAuth(req,res,next){
  


  if(req.header.cookie !== 'undefined'){


    let token = req.headers.cookie.split("=")[1] ;
    let privateKey = "myPasstest1" ;  //fs.readFileSync('./private.pem','utf8');
    console.log(token);

    jwt.verify(token,privateKey,{algorithm: "HS256"},(err,usr) =>{

      if(err){
        res.status(500).json({error : "No token"});
        //throw new Error ("no token");
        //res.send(" Error you must log in ");
      }

      return next ();
    });
  }

  else {
   res.status(500).json({err : "No head "});
       // throw new Error ("no ");
    
   }


}



router.get('/data' ,isAuth,(req,res,err)=>{

    user.find({},function (err,users) {

         //console.log(users);
         res.render("data.ejs",{data:users});
        // res.render("data.ejs",{checkSign:"hallo"});
  
    });


    //res.render("data.ejs",{data:users});
    //res.render("data.ejs",{checkSign:"hallo"});
});




module.exports=router;


