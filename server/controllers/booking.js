const bookingInfo=require('../models/booking');
const room = require('../models/room');
const roomInfo=require('../models/room');

const bookRoom=async(req,res)=>{
    try {
        const Rooms=req.body.Rooms;
        await Rooms.forEach(room => {
            const RoomNumber=room.roomNo;
            roomInfo.findOneAndUpdate({roomNo:RoomNumber},{isOccupied:true});           
        });
        res.status(200).json({msg:"Booking Done"});
    } catch (error) {
        res.status(500).json({msg:error});
    }
}
module.exports=bookRoom;