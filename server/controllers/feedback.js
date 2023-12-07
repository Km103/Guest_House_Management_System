const feedbackData = require("../models/feedback");

const provideFeedback = async (req, res) => {
    try {
        await feedbackData.create(req.body);
        res.status(201).json({
            msg: "feedback submitted successfully",
            feedback: req.body,
        });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

module.exports = provideFeedback;
