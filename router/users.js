var http = require('http');
const express = require('express');
var app = express();
const router = express.Router();
const bodyParser = require('body-parser')
const path = require('path')
const user = require('../models/user.js')
router.use(express.static("./public"));

var formidable = require("formidable");
var multer = require("multer") ;


const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");


router.use(cookieParser());


// use body  parser  and work with express
router.use(bodyParser.urlencoded(
    {extended:true}
));


var userName  ;


app.set('view engine', 'ejs');



const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename : function(req, file, cb){
    cb(null,file.fieldname + '-'+ req.body.email + '-'+  Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
   storage : storage 
   
}); 


router.get('/sign',(req,res,err)=>{

// res.sendFile(path.join(__dirname ,"..","public" ,"sign.html"));  
res.render("sign.ejs",{checkSign:"hallo",test:"try1"});
});





router.post('/',(req,res,next)=>{
   


    user.find({userEmail: req.body.email},function (err,users) {

        if(users[0]==undefined)
             res.sendFile(path.join(__dirname ,"..","public" ,"index.html"));

        else if  (users[0].userPassword==req.body.password && users[0].userEmail==req.body.email ){
           userName = users[0].userFristName + " " + users[0].userLastName ;


        // userName = "uuuuuuu";

            let privateKey = "myPasstest1" ;
            let token = jwt.sign({"user":users[0].userEmail},privateKey,{algorithm:'HS256'});
            res.cookie("token", token);
            //res.cookie("username", userName);
             res.app.set("username" ,userName);

        

            res.render("user.ejs",{myData:users[0]});
        }


        else {
            res.sendFile(path.join(__dirname ,"..","public" ,"index.html"));
        }
  
    });

});



router.post('/sign',upload.single('image'),(req,res,next)=>{

    if(req.body.email=="")
        res.render("sign.ejs",{checkSign:" error ",test:" there is no email "});

    else if(req.body.password=="")
        res.render("sign.ejs",{checkSign:" error ",test:" there is no passsword "});

    else if(req.body.frist_name=="")
        res.render("sign.ejs",{checkSign:" error ",test:" there is no  frist name  "});

    else if(req.body.birth_day=="")
        res.render("sign.ejs",{checkSign:" error ",test:" there birth day"});


    else if(req.file==undefined)
        res.render("sign.ejs",{checkSign:" error ",test:" image not found"});


    else {
    
    user.find({userEmail: req.body.email},function (err,users){

        if(users[0]==undefined ){

            var user1 = new user({
            userFristName : req.body.frist_name,
            userLastName : req.body.last_name,
            userEmail : req.body.email,
            userPassword : req.body.password,
            userBirthDay : req.body.birth_day,
            userAdress : req.body.adress,
            userType : req.body.type, 
            userImage :  '/uploads/'+req.file.filename

            });
           
            user1.save((err,user)=>{
                if(err)
                    console.log(err);
                else 
                    console.log(" save ");
            });

            
         res.render("user.ejs",{myData:user1});
        }



        else if(users[0].userEmail==req.body.email)
            res.render("sign.ejs",{checkSign:"this mail is regestered ",test:"sign with  anther one "});


        else  
            res.render("sign.ejs",{checkSign:" error ",test:"sign again "});

 
    });

}
 
});


module.exports=router;


