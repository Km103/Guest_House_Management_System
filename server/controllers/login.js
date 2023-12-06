const facultyData=require('../models/faculty');
const studentData=require('../models/student');
const tprcData=require('../models/tprc');
const bcrypt = require ('bcrypt');

const saltRounds=12;

const login= async(req,res)=>{
    try{
       const emailid=req.body.email;
       const facultyuser=await facultyData.findOne({email:emailid});
       const studentuser=await studentData.findOne({email:emailid});
       const tprcuser=await tprcData.findOne({email:emailid});
        if(!(studentuser ||facultyuser||tprcuser)){
            return res.status(404).json({msg:"User Not Found"});
        }
        const pass=req.body.password;
        let user;
        if(studentuser){
            user=studentuser;
        }
        if(facultyuser){
            user=facultyuser;
        }
        if(tprcuser){
            user=tprcuser;
        }
        const hash=user.password;
        bcrypt.compare(pass, hash).then(function(result) {
            if(!result){
                res.status(403).json({msg:"Invalid Password"});
            }
            else{
                res.status(200).json({msg:"login successful"});
            }
        });

    }
    catch(error){
        res.status(500).json({msg:error});
    }
}

module.exports={login};