const mongoose=require('mongoose');

const studentschema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"must provide name of relative "],
    },
    RollNo:{    
        type:String,
        required:[true,"must provide student college id "],
    },    
    email:{
        type:String,
        required:[true,"must provide student email id"],
    },
    password:{
        type:String,
        required:[true,"password is necessary"],
    }
});

module.exports=mongoose.model('student',studentschema);