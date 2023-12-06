const mongoose=require('mongoose');

const feedbackschema=new mongoose.Schema({
    data:{
        type:String,
        required:[true,"must provide feedback "],
    }
   
});

module.exports=mongoose.model('feedback',feedbackschema);