const facultyData = require("../models/faculty");
const studentData = require("../models/student");
const bcrypt = require("bcrypt");
const { createSecretToken } = require("../util/SecretToken");

const createFacultyAccount = async (req, res) => {
    try {
        const password = req.body.password;

        const userdata = req.body;
        const existingUser = await facultyData.findOne({
            email: req.body.email,
        });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        await bcrypt.hash(password, 12, function (err, hashed) {
            if (err) {
                console.log(err);
                res.json(err);
                return;
            }
            userdata.password = hashed;
            try {
                facultyData.create(userdata);
            } catch (error) {
                res.status(500).json({ msg: error });
            }
            const token = createSecretToken(facultyData._id);
            res.cookie("token", token, {
                withCredentials: true,
                httpOnly: false,
            });
            res.status(200).json({ msg: "account created", success: true });
        });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const createStudentAccount = async (req, res) => {
    try {
        const password = req.body.password;

        const userdata = req.body;
        const existingUser = await studentData.findOne({
            email: req.body.email,
        });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        await bcrypt.hash(password, 12, function (err, hashed) {
            if (err) {
                console.log(err);
                res.json(err);
                return;
            }
            userdata.password = hashed;

            try {
                studentData.create(userdata);
            } catch (error) {
                res.status(500).json({ msg: error });
            }
            const token = createSecretToken(studentData._id);
            res.cookie("token", token, {
                withCredentials: true,
                httpOnly: false,
            });
            res.status(200).json({ msg: "account created", success: true });
        });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

module.exports = { createFacultyAccount, createStudentAccount };
