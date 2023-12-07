const mongoose = require("mongoose");

const feedbackschema = new mongoose.Schema({
    data: {
        type: String,
        required: [true, "must provide feedback "],
    },
    roomNo: {
        type: String,
        required: [true, "must provide room number"],
    },
});

module.exports = mongoose.model("feedback", feedbackschema);
