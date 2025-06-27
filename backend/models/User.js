const mongoose = require("mongoose");  //requiring mongoose

//Making Schema 
const userSchema = new mongoose.Schema({  
    name : {
        type : String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
});

module.exports = mongoose.model("User",userSchema);