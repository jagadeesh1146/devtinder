const express = require('express')
const {userAuth} = require('../middleWare/auth')
const {connectionRequestModel} = require('../models/connectionRequest')
const UserModel = require('../models/users');

const requestRouter = express.Router();


requestRouter.post("/request/send/:status/:toUserId",
     userAuth, async(req , res)=>{


        try{
            const fromUserId = req.user._id
            const toUserId = req.params.toUserId
            const status = req.params.status

            const allowedStatus = ["interested" , "ignored"]

            if(!allowedStatus.includes(status)){
                return res.status(400).json({message:"invalid-status-type: " + status})
            }

            const existingConnectionRequest = await connectionRequestModel.findOne({
                $or:[
                    {fromUserId,toUserId},
                    {fromUserId:toUserId , toUserId : fromUserId},
                ],
            })
            if(existingConnectionRequest){
                return res.status(400).json({message : "connection request already created"})
            } 
            const toUser =  await UserModel.findById(toUserId)

            if(!toUser){
                res.status(404).json({message : "invalid-user"})
                
            }

            if(fromUserId === toUser){
                res.status(404).json({message : "same user cannot send request to himself"})
            }
            const connectionRequest= new connectionRequestModel({
                fromUserId,
                toUserId,
                status
            })

            const data = await connectionRequest.save()
            let message;

            if (status === "interested") {
                message = "Connection request sent successfully";
            } else if (status === "ignored") {
                message = "Connection request ignored successfully";
            }

            res.json({
                message,
                data
            });
        }
        catch(err){
            res.status(400).send("Error is : " + err.message)
        }
    
})

requestRouter.post(
    "/request/review/:status/:requestId",
    userAuth,
    async (req, res) => {

        try {

            const loggedInUser = req.user;
            const status = req.params.status;
            const requestId = req.params.requestId;

            // 1. Allowed statuses
            const allowedStatus = ["accepted", "rejected"];

            // 2. Validate status
            if (!allowedStatus.includes(status)) {
                return res.status(400).send("Invalid status");
            }

            // 3. Find the connection request
            const connectionRequest =
                await connectionRequestModel.findOne({
                    _id: requestId,
                    toUserId: loggedInUser._id,
                    status: "interested"
                });

            // 4. Request doesn't exist
            if (!connectionRequest) {
                return res.status(404).send(
                    "Connection request not found"
                );
            }

            // 5. Update status
            connectionRequest.status = status;

            // 6. Save
            const data = await connectionRequest.save();

            // 7. Response
            res.json({
                message: `Connection request ${status} successfully`,
                data
            });

        } catch (err) {

            res.status(400).json({
                message: "Error is: " + err.message
            });

        }
    }
);

module.exports = requestRouter;