const mongoose=require('mongoose');

const tprcschema=new mongoose.Schema({    
    email:{
        type:String,
        required:[true,"must provide student email id"],
    },
    password:{
        type:String,
        required:[true,"password is necessary"],
    }
});

module.exports=mongoose.model('tprc',tprcschema);