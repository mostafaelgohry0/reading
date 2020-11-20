require('dotenv').config();

const express = require('express');
const app = express();
http = require('http');
var server = http.createServer(app);
const path = require('path');


var io = require('socket.io')();

const mongoose = require('mongoose');
const userRouter = require('./router/users.js');
const checkRouter = require('./router/check.js');
const dataRouter = require('./router/data.js');
const chatRouter = require('./router/chat.js');
const addArticleRouter = require('./router/addarticle');
const articlesRouter = require('./router/articles')





var socketIo = require('./chat_socket.js')(io);
io.attach(server);

//const upLoadFile = require('./router/uploadfile.js')

/*
//const mongodb = require('mongodb')
//const  MongoClient = require('mongodb').MongoClient ;
MongoClient.connect(process.env.DATABASE,(err,db)=>{
   if(err) throw err
   else
   console.log(" connted ");
})
*/


app.use(express.static("public"));    

app.set('view engine', 'ejs');

//// middelwares
//app.use(bodyparser.json());
app.use('/',userRouter);
app.use('/',checkRouter);
app.use('/',dataRouter);
app.use('/',chatRouter);
app.use('/',addArticleRouter);
app.use('/',articlesRouter);
//app.use('/',upLoadFile);




mongoose.connect(process.env.DATABASE,{useNewUrlParser: true ,useUnifiedTopology: true })

mongoose.connection.on('connected',()=>{
  console.log("database connected ......");
});

mongoose.connection.on('error ',(err)=>{
  console.log("the error is " + err);
});









server.listen(process.env.PORT,()=>{

  console.log("server on port 8080")
})
