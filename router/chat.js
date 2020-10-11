
var express = require('express');
var app = express();

const router = express.Router();
const bodyParser = require('body-parser')
const path = require('path')

var server = http.createServer(app);



//var io = require('socket.io').listen(server);

//var http = require('http').Server(app);


const user = require('../models/user.js')
router.use(express.static("../public"));

var name ;

// use body  parser  and work with express
router.use(bodyParser.urlencoded(
    {extended:true}
));



router.get('/chat',(req,res,err)=>{
	 name = res.app.get("username");
	console.log(name);
              
   res.sendFile(path.join(__dirname ,"..","public","chat.html")); 
   //res.render("chat.ejs",{myData:res.app.get("username")});









});


module.exports=router;


module.exports.mym = function (v){
   return name ;
};


