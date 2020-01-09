const express = require("express");
const tripRouter = require("./tripRouter");
const userRouter = require("./userRouter");

const router = express.Router();

router.use("/trips", tripRouter);
router.use("/users", userRouter);

module.exports = router;
