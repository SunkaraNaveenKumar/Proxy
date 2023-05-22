const { tokenGeneration } = require("../helpers/tokenGeneration")
const admins = require("../models/admins")

const adminController={}

adminController.login=async(req,res)=>{
    const {body}=req
    console.log("body",body);
    try{
    const admin  =await admins.findOne({email:body.email})
    if(!admin){
        res.json({errors:"Invalid Email or password"})
    }else{
        let expiresIn="1d"
        if(body.password === admin.password){
            const token = tokenGeneration(admin,req,expiresIn)
            res.json({token :`Bearer ${token}`})
        }else{
            res.json({errors:"Invalid Email or password"})
        }
    }
    }catch(err){
        res.json(err)
    }
}
module.exports= adminController