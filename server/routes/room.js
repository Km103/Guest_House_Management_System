const express=require('express');
const userVerification = require('../middlewares/AuthMiddleware');
const router=express.Router();
// const {GetRoomInfo,UpdateRoomInfo}=require('../controllers/room');
const { addRoom } = require('../controllers/room');

//middleware
router.use('/', userVerification);

// router.get('/',GetRoomInfo);
// router.post('/',UpdateRoomInfo);
router.post('/add', addRoom)


module.exports = router;