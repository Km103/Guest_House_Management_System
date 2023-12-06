const jwt = require("jsonwebtoken");
const facultyData = require("../models/faculty");
const studentData = require("../models/student");
const tprcData = require("../models/tprc");

const userVerification = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ status: false });
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
            return res.json({ status: false });
        } else {
            const user = await facultyData.findById(data.id);
            if (user) {
                req.customer_id = req.cookies.userId
                next();
            } else return res.json({ msg:"user verification failed",status: false });
        }
    });
};

module.exports = userVerification;
