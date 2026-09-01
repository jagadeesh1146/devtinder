const mongoose = require("mongoose")

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,

    },
    toUserId:{
         type : mongoose.Schema.Types.ObjectId,
         ref : "User",
         required : true,
    },
    status:{
        type:String,
        enum:{
            values : ["ignored", "interested","accepted", "rejected"],
            message : `{VALUE} is not ain the list`,
        }
    },
   },
   {
    timestamps : true,
   }
)

const connectionRequestModel =  mongoose.model("connectionRequest",connectionRequestSchema)

module.exports={connectionRequestModel}