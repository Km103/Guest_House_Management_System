const express=require('express');
const router=express.Router();

const {createFacultyAccount, createStudentAccount}=require('../controllers/register');
const userVerification = require('../middlewares/AuthMiddleware');

router.post('/user/faculty',  createFacultyAccount)
router.post('/user/faculty',  createFacultyAccount)

router.post('/user/student', createStudentAccount)


// router.route('/user/faculty').post(createFacultyAccount);

// router.route('/user/student').post(createStudentAccount);

module.exports=router;