const mongoose=require('mongoose');

const facultyschema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"must provide name"],
    },
    email:{
        type:String,
        required:[true,"must provide email id"],
    },
    password:{
        type:String,
        required:[true,"password is necessary"],
    }
});

module.exports=mongoose.model('faculty',facultyschema);