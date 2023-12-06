const mongoose=require('mongoose');

const roomschema=new mongoose.Schema({
    type:{
        type:String,
        required:[true,"must provide room type "],
    },
    roomNo:{
        type:String,
        required:[true,"must provide room number"]
    },
    price:{    
        type:Number,
        required:[true,"must provide room price "],
    },    
    isOccupied:{
        type:Boolean,
        default:false,
    }
});

module.exports=mongoose.model('room',roomschema);