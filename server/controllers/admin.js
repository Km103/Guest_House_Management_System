const FeedbackData = require("../models/feedback");

const viewFeedback = async (req, res) => {
    try {
        const feedbacks = await FeedbackData.find();

        console.log(feedbacks);

        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

module.exports = viewFeedback;
