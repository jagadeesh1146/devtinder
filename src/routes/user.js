const express = require("express");
const { userAuth } = require("../middleWare/auth.js");
const { connectionRequestModel } = require("../models/connectionRequest.js");

const userRouter = express.Router();

userRouter.get("/user/request", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequest = await connectionRequestModel.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", ["firstName", "lastName"])

        res.json({
            message: "Connection requests found",
            data: connectionRequest
        });
    }
    catch (err) {
        res.status(500).send("Error is: " + err.message);
    }
});

module.exports = userRouter;