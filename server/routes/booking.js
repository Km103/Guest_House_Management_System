const express=require('express');
const bookRoom = require('../controllers/booking');
const userVerification = require('../middlewares/AuthMiddleware');
const router=express.Router();

router.use("/",userVerification);

router.post("/",bookRoom);
module.exports=router;