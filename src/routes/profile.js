const express = require("express")
const {userAuth} = require('../middleWare/auth')
const {validateProfileEditData}= require("../utils/validate");

const profileRouter = express.Router();

profileRouter.get("/profile/view" ,userAuth , async (req,res)=>{
     try {
    
        const user=req.user
    
        res.send(user);
    
      } catch (err) {
    
        console.log(err);
    
        res.status(401).send("Invalid token");
    
      }

})

profileRouter.patch("/profile/edit" , userAuth , async (req ,res)=>{

    // validate profile data
    try{
     
        if(!validateProfileEditData(req)){
            throw new Error ("invalid edit request")
        }
        const loggedInUser = req.user
        console.log(loggedInUser)

      Object.keys(req.body).forEach((key)=>loggedInUser[key]= req.body[key])

        console.log(loggedInUser)

        await loggedInUser.save()

        res.json(
            {
                message : `${loggedInUser.firstName} has been edited the profile`
            }
        )
    

    }catch(err){
        res.send("err :" + err.message)

    }



})


module.exports= profileRouter;
