const express=require('express');
const router=express.Router();
const{viewFeedback }= require('../controllers/admin');

router.route('/feedback').get(viewFeedback);
module.exports=router;