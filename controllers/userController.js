const User = require('../models/userModel')


const register = async (req,res)=>{
    console.log(req.body)
    const{name, email,password, contactNumber,address} = req.body
    try {
        const regUser = await User.create({name, email,password, contactNumber,address})
        if(!regUser){
            res.status(400).send({msg:"Not registered"})
        }
        res.status(200).send({msg:"Register successfully"})
    } catch (error) {
        res.status(500).send({msg:"Server Error"})
    }
}



module.exports = {register}