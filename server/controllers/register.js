const createFacultyAccount=(req,res)=>{
    res.send('Faculty account created successfully');
}

const createStudentAccount=(req,res)=>{
    res.send('Student account created successfully');
}


module.exports={createFacultyAccount,createStudentAccount};