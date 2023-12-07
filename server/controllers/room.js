const RoomData = require("../models/room");

const updateRoomPrice = async(req, res) => {
    const { price, roomNumber } = req.body;

     RoomData.findOne({ roomNo: roomNumber })
        .then((room) => {
            if (!room) {
                res.status(404).json({ msg: "Room not found" });
                return;
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ msg: "Internal Error" });
        });

     RoomData.findOneAndUpdate({ roomNo: roomNumber }, { price: price })
        .then((resp) => {
            res.status(200).json({
                updatedRoom: resp,
                msg: "Updated Room successfully",
                success: true,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ msg: "Internal Error" });
        });
};

const addRoom = (req, res) => {
    const { type, roomNo, price } = req.body;

    const room = new RoomData({
        roomNo: roomNo,
        type: type,
        price: price,
    });

    room.save().then((room) => {
        res.status(201)
            .json({
                roomCreated: room,
                status: "room created",
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({ err: err });
            });
    });
};

const getRooms = (req, res) => {
    RoomData.find()
        .then((rooms) => {
            res.status(200).json({ rooms: rooms });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ msg: "Internal Error" });
        });
};

const checkout=async(req,res)=>{
    try {
        console.log(req.body);
        const number=req.body.roomNo;
        console.log(number)
        const room= await RoomData.findOne({roomNo:number});
        if(!room){
            return res.status(400).json({msg:"Invalid Room number"});
        }

        await RoomData.updateOne({ roomNo: number },{ isOccupied: false });
        await RoomData.updateOne({ roomNo: number },{ booking_id: null });

        res.status(200).json({msg:"checkout successful"})

    } catch (error) {
        res.status(500).json({ msg: error });
    }

}

module.exports = { addRoom, updateRoomPrice, getRooms,checkout };
