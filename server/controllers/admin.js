
const Feedback=require('../models/feedback');

const viewFeedback=async(req,res)=>{
    try{
        const feedbacks=await Feedback.find({});
        res.status(200).json({feedbacks});
    } catch(error){
        res.status(500).json({msg:error});
    }
}

module.exports={viewFeedback};