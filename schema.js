const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    price:{
        type:Number,
        required:true
    }
})

const user  = mongoose.model('user',userschema);

module.exports=user;
