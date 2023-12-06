const RoomData = require("../models/room");

const updateRoomPrice = (req, res) => {
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

module.exports = { addRoom, updateRoomPrice, getRooms };
