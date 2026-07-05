const express = require("express")

const app = express()

app.use("/app",(req,res)=>{
    res.send("hello this from ")
})

app.listen(3000, ()=>{
    console.log("this is a server")
})