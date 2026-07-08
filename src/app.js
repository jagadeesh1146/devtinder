const express = require("express")

const connectDB = require("./config/dataBase")
const UserModel = require("./models/users")

const app = express()


app.post("/signup", async (req,res)=>{

    try{

        const user = new UserModel({
            firstName:"jagadeesh",
            lastName:"babu",
            age:28,
        })

        await user.save()

        res.send("success")

    }
    catch(err){

        res.status(500).send("Error saving user")

    }

})

connectDB()
.then(()=>{

    console.log("Database connected")

    app.listen(3000,()=>{
        console.log("server is running")
    })

})
.catch((err)=>{

    console.log("Database connection failed", err)

})