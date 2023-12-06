const facultyData = require("../models/faculty");
const studentData = require("../models/student");
const tprcData = require("../models/tprc");
const bcrypt = require("bcrypt");
const { createSecretToken } = require("../util/SecretToken");
const saltRounds = 12;

const login = async (req, res) => {
    try {
        const emailid = req.body.email;
        const facultyuser = await facultyData.findOne({ email: emailid });
        const studentuser = await studentData.findOne({ email: emailid });
        const tprcuser = await tprcData.findOne({ email: emailid });
        if (!(studentuser || facultyuser || tprcuser)) {
            return res.status(404).json({ msg: "User Not Found" });
        }
        const pass = req.body.password;
        let user;
        let token;
        if (studentuser) {
            user = studentuser;
            token = createSecretToken(studentuser._id);
        }
        if (facultyuser) {
            user = facultyuser;
            token = createSecretToken(facultyuser._id);
        }
        if (tprcuser) {
            user = tprcuser;
            token = createSecretToken(tprcuser._id);
        }
        const hash = user.password;
        bcrypt.compare(pass, hash).then(function (result) {
            if (!result) {
                return res.status(403).json({ msg: "Invalid Password" });
            }
        });
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res.status(200).json({
            user : user,
            token : token,
            message: "User logged in successfully",
            success: true,
        });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

module.exports = { login };
