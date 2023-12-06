const jwt = require("jsonwebtoken");
const facultyData=require('../models/faculty');
const studentData=require('../models/student');
const tprcData=require('../models/tprc');

const userVerification=(req,res, next)=>{
    const token=req.cookies.token;
    if(!token){
        return res.json({status:false});
    }
    jwt.verify(token,process.env.TOKEN_KEY, async (err, data) =>{
        if (err) {
            return res.json({ status: false })
        } else {
             const user = await facultyData.findById(data.id)
             if (user){
                next()
             } 
            //  return res.json({ status: true, user: user.username })
             else return res.json({ status: false })
        }
    })

}

module.exports=userVerification;