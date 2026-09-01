const express = require('express')
const {validateSignup} = require("../utils/validate")
const bcrypt = require("bcrypt")
const authRouter = express.Router();
const UserModel = require('../models/users')

authRouter.post("/signup", async (req, res) => {
  try {


    validateSignup(req);
   

    const { firstName, lastName, email, password , about , skills } = req.body;
   

    const hashpassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      firstName,
      lastName,
      email,
      password: hashpassword,
      about,
      skills,
    });

    await user.save();

    res.send("user created successfully");

  } catch (err) {
    console.log("ERROR:", err);
    res.status(400).send(err.message);
  }
});


authRouter.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    // 1. Find user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    // 2. Compare password
    const isPasswordCorrect = await user.validatePassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    // 3. Generate JWT
    const token = user.getJwt();

    // 4. Store token in cookie
    res.cookie("token", token);

    res.send("login-success!!!!");

  } catch (err) {

    console.log("LOGIN ERROR:", err.message);

    res.status(500).json({
      message: "Server error"
    });
  }

});

authRouter.post("logout", async (req , res)=>{
    res.cookie("token", null ,{
        expires : new Date(Date.now())
    })
    res.send("logout suceess")
} 
)

module.exports = authRouter;