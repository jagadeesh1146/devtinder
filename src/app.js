
const express = require("express") 
const bcrypt = require("bcrypt")
const connectDB = require("./config/dataBase")
const UserModel = require("./models/users")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser");
const authRouter = require('./routes/auth.js')
const profileRouter = require('./routes/profile.js')
const requestRouter = require('./routes/request.js')
const userRouter = require('./routes/user.js')



const app = express()

app.use(express.json())

app.use(cookieParser());

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)
app.use("/", userRouter)


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