const jwt = require("jsonwebtoken");
const facultyData = require("../models/faculty");
const studentData = require("../models/student");
const tprcData = require("../models/tprc");

const userVerification = (req, res, next) => {
    const token = req.body.token;

    if (!token) {
        return res.json({ status: false });
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
            return res.json({ status: false });
        } else {
            const user1 = await facultyData.findById(data.id);
            const user2=await studentData.findById(data.id);
            if (user1 || user2) {
                next();
            } else {
                return res.json({
                    msg: "user verification failed",
                    status: false,
                });
            }
        }
    });
};

module.exports = userVerification;
