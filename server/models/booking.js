const mongoose=require('mongoose');

const bookingschema=new mongoose.Schema({
    customer_id:{
        type:mongoose.Types.ObjectId,
        required:[true,"must provide customer id"],
    },
    amount:{
        type:Number,
        required:[true,"must provide amount"],
    },
    Rooms:{
        type:Array,
        required:[true,"Rooms array is necessary"],
    },
    checkin:{
        type:String,
        required:[true,"provide check in date"],
    },
    days:{
        type:Number,
        required:[true,"Rooms days are necessary"],
    }
});

module.exports=mongoose.model('booking',bookingschema);