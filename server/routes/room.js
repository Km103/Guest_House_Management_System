const express = require("express");
const userVerification = require("../middlewares/AuthMiddleware");
const router = express.Router();
// const {GetRoomInfo,UpdateRoomInfo}=require('../controllers/room');
const { addRoom, getRooms } = require("../controllers/room");
const {
    updateRoomPrice,
    checkout,
    deleteRoom,
} = require("../controllers/room");
const adminVerification = require("../middlewares/AuthAdmin");

//middleware
// router.use("/",adminVerification);

router.post("/add", addRoom);
router.get("/getAll", getRooms);
router.post("/price", updateRoomPrice);
router.post("/checkout", checkout);
router.post("/delete", deleteRoom);
module.exports = router;
