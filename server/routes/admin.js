const express=require('express');
const router=express.Router();
const viewFeedback = require('../controllers/admin');
const adminVerification = require('../middlewares/AuthAdmin');

//middleware
router.use("/",adminVerification);

router.post("/feedback",viewFeedback);
module.exports=router;