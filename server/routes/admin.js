const express=require('express');
const router=express.Router();
const{viewFeedback }= require('../controllers/admin');
const { route } = require('./register');
const userVerification = require('../middlewares/AuthMiddleware');

router.use('/', userVerification)
router.get('/feedback', viewFeedback)

module.exports=router;