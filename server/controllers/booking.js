const bookingInfo = require("../models/booking");
const room = require("../models/room");
const roomInfo = require("../models/room");

const bookRoom = async (req, res) => {
    const error = [];
    try {
        const rooms = req.body.Rooms;
        console.log(rooms);
        rooms.forEach(async (room) => {
            let roomD = await roomInfo.findOne({ roomNo: room.roomTitle });
            if (!(roomD && roomD.isOccupied === 0)) {
                error.push(room.roomNo);
            }
        });

        if (error.length > 0) {
            return res.status(400).json({
                msg: "Rooms are already booked",
                roomsOccupied: error,
            });
            return;
        }

        const { customer_id, amount, Rooms, checkin, days } = req.body;
        const booking = new bookingInfo({
            customer_id: customer_id,
            amount: amount,
            Rooms: Rooms,
            checkin: checkin,
            days: days,
        });

        const book = await booking.save();

        rooms.forEach(async (room) => {
            let roomD = await roomInfo.findOne({ roomNo: room.roomTitle });
            const resp1 = await roomInfo.updateOne(
                { roomNo: room.roomTitle },
                { isOccupied: true }
            );
            const resp2 = await roomInfo.updateOne(
                { roomNo: room.roomTitle },
                { booking_id: book._id }
            );
        });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

module.exports = bookRoom;
