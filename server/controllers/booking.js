const bookingInfo=require('../models/booking');
const room = require('../models/room');
const roomInfo=require('../models/room');

const bookRoom=async(req,res)=>{
    try {
        const Rooms=req.body.Rooms;
        Rooms.forEach(async room => {
            let roomD =  await roomInfo.findOne({roomNo : room.roomNo});
            if(!(roomD & roomD.isOccupied)) {
                return res.status(404).json({msg : `${room.roomNo} not found or occupied`})
            }
            const resp1 = await roomInfo.updateOne({roomNo : room.roomNo}, {isOccupied : true})

        });

        const {customer_id,amount,rooms,checkin,days}=req.body;
            const booking = new bookingInfo({
                customer_id: customer_id,
                amount: amount,
                Rooms: rooms,
                checkin:checkin,
                days:days
            });
        
        const book=await booking.save()
        
        Rooms.forEach(async room => {
            let roomD =  await roomInfo.findOne({roomNo : room.roomNo});
            const resp2 = await roomInfo.updateOne({roomNo : room.roomNo}, {booking_id : book._id})
        });
    } catch (error) {
        res.status(500).json({msg:error});
    }
}

module.exports=bookRoom;