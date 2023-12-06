const express = require("express");
const userVerification = require("../middlewares/AuthMiddleware");
const router = express.Router();
// const {GetRoomInfo,UpdateRoomInfo}=require('../controllers/room');
const { addRoom, getRooms } = require("../controllers/room");
const { updateRoomPrice } = require("../controllers/room");

//middleware
router.use("/", userVerification);

router.post("/add", addRoom);
router.get("/getAll", getRooms);
router.post("/price", updateRoomPrice);

module.exports = router;
