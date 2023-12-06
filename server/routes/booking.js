const express=require('express');
const bookRoom = require('../controllers/booking');
const router=express.Router();

router.post("/",bookRoom);
module.exports=router;