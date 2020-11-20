var http = require('http');
const express = require('express');
var app = express();
const router = express.Router();
const bodyParser = require('body-parser')
const path = require('path')
const article = require('../models/articles')
router.use(express.static("./public"));
var multer = require("multer") ;

// use body  parser  and work with express
router.use(bodyParser.urlencoded(
    {extended:true}
));


const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename : function(req, file, cb){
      cb(null,file.fieldname + '-'+ req.body.article_name + '-'+  Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({
     storage : storage 
     
  }); 
  
  

  

router.get('/addarticle',(req,res,err)=>{

 res.sendFile(path.join(__dirname ,"..","public" ,"addarticle.html"));  
});



router.post('/addarticle',upload.single('image'),(req,res,next)=>{

    var newArticle = new article ({
      auther :  req.body.auther_name,
      title: req.body.article_title,
      body : req.body.article_content,
       
      image :  '/uploads/'+req.file.filename 
    });
  
    newArticle.save((err,article)=>{
      if(err)
          console.log(err);
      else 
          console.log(" save ");
  });
  
  res.send("posted");
  
  });



module.exports=router;


