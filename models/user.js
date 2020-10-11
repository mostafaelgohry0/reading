const mongoose = require('mongoose');
const userSchema = mongoose.Schema({

    userFristName : String,
    userLastName :String,
    userEmail:{type:String ,required:true},
    userPassword : {type:String ,required:true},
    userBirthDay:Date,
    userAdress : String,
    userType:String,
    userImage : String  // {Data : Buffer , contentType:String }
    
})

 var user = mongoose.model("user",userSchema);
module.exports = user ;