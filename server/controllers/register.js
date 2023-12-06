const facultyData=require('../models/faculty');
const studentData=require('../models/student');
const bcrypt = require ('bcrypt');

const createFacultyAccount=async(req,res)=>{

    try{
        const password=req.body.password;

        const userdata=req.body;

        await bcrypt.hash(password, 12, function(err, hashed) {
            if(err) {
                console.log(err)
                res.json(err)
                return
            }
            userdata.password=hashed;
            try{
                facultyData.create(userdata);
            }
            catch(error){
                res.status(500).json({msg:error});
            }
            res.json({msg:"account created"});
        })
  
    }
    catch(error){
        res.status(500).json({msg:error});
    }
}

const createStudentAccount=async(req,res)=>{
    try{
        const password=req.body.password;

        const userdata=req.body;

        await bcrypt.hash(password, 12, function(err, hashed) {
            if(err) {
                console.log(err)
                res.json(err)
                return
            }
            userdata.password=hashed;

            try{
                studentData.create(userdata);
            }
            catch(error){
                res.status(500).json({msg:error});
            }
            res.json({msg:"account created"});
            
        })
    }
    catch(error){
        res.status(500).json({msg:error});
    }    
}


module.exports={createFacultyAccount,createStudentAccount};