
var express = require('express');
var app = express();

//var http = require('http').Server(app);
var io = require('socket.io');

var userName2 ;



var userName =  require('./router/chat.js');







module.exports = function (io) {




//console.log(userName2);


var logedInUserArray = [] ;
var usersID = [];
var logedInName= userName2 ;
//console.log(logedInName);

io.on('connection', function(socket){
	

	 logedInName = userName.mym(7);

				socket.on('chat message', function(msg){
    				io.emit('chat message', msg );
  				});


 				/*
 				socket.on('chat message', function(msg){
    			  console.log('message :' + msg);
  				});
				*/


  				socket.emit('user',logedInName);
                 
                var temId = logedInName +"|"+ socket.id;
                
                usersID.push(temId);
                //console.log(logedInName);
  				

               
  				var sendUserArray = setInterval(function(){
  					socket.emit('logedInUsers',logedInUserArray);  					
  				},3000);



  			   socket.on('disconnectUser',function(logedOutUser){

                  console.log("user loged out : " + logedOutUser);
  			   })
  				

  				socket.on('typing',function(user){

  					//console.log('typing now : '+ user );
  					socket.broadcast.emit('typing',user);
  				})	
  				
            

              

            
  				socket.on('disconnect',function(){
					
  					
  					//io.emit('logedOutUser',logedInName);

                   
     /////// remove the ids who loged out 

  					var l=usersID.length;
  					for(var i=0 ; i<l ; i++ ){

  						var  splitUsersId= usersID[i].split('|');
  						if(socket.id== splitUsersId[1]){
  							var removeIndex = i ;
  							break;
  						}
  					}
  					usersID.splice(removeIndex,1);


    //// remove the users  who loged out
  					var l2 = logedInUserArray.length;
  					for(var i=0 ; i<l2 ; i++ ){

  						
  						if(splitUsersId[0]== logedInUserArray[i]){
  							var removeIndex = i ;
  							break;
  						}
  					}

                    logedInUserArray.splice(removeIndex,1);

  					console.log(" who logedout " +  splitUsersId[0]);
  				});
           

			});






 
}

