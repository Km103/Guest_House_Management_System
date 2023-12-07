const adminVerification = (req, res, next)=>{
    if(req.body.email==="admin"){
        if(req.body.password==="admin"){
            next()
        }
    }
    else{
        res.send(403).json({msg:"Unauthorised user"});
    }

    
}

module.exports=adminVerification;