const express = require("express");
const { getAllbookings, bookRoom } = require("../controllers/booking");
const userVerification = require("../middlewares/AuthMiddleware");
const provideFeedback = require("../controllers/feedback");
const router = express.Router();

// router.use("/", userVerification);

router.post("/", bookRoom);

router.get("/getAll", getAllbookings);

router.post("/feedback", provideFeedback);

module.exports = router;
