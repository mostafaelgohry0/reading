const mongoose = require('mongoose');
const articleSchema = mongoose.Schema({

    auther : String,
    title : String,
    body : String,
    date : {type : Date ,default :Date.now  },
    image : String ,
   


})

var article = mongoose.model("article",articleSchema);
module.exports = article ;