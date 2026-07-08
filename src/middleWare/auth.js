 const auth=(req,res,next)=>{
    const token = "xyz"
    const authorized= token==="xyz"
    if(!authorized){
        res.status(401).send("invalid user")
    }else{
        next()
    }
}

module.exports={
    auth
}