const express=require('express');
const router=express.Router();

const {createFacultyAccount, createStudentAccount}=require('../controllers/register');


router.route('/user/faculty').post(createFacultyAccount);

router.route('/user/student').post(createStudentAccount);

module.exports=router;