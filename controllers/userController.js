const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const register = async (req,res)=>{
    console.log(req.body)
    let {name, email,password, contactNumber,address} = req.body

    try {

        const existingUser = await User.findOne({
            where:{email:email}
        })
        console.log(existingUser)
        if(!existingUser){

                        console.log(password)
        const salt = await  bcrypt.genSalt(10)
        password = await bcrypt.hash(req.body.password,salt)

        console.log("hashed password", password)
        
        const regUser = await User.create({name, email,password, contactNumber,address})
        if(!regUser){
            res.status(400).send({msg:"Not registered",success:false})
        }
        res.status(200).send({msg:"Register successfully", success:true})
        if(existingUser){
            res.status(200).send({msg:"User already exists",success:false})
        }
    }
 }catch (error) {
        res.status(500).send({msg:"Server Error"})
    }
}

const login = async (req,res) =>{
    console.log(req.body)
    const {email,password} = req.body
    try {
        const loggedUser = await User.findOne({
            where:{email:email}
        })
        console.log(loggedUser, "logged user")
        if(!loggedUser){    
            res.status(400).send({msg:"User not found",success:false})
        }
        if(await bcrypt.compare(password, loggedUser.password)){
            const payload = {id:loggedUser.id, role:loggedUser.role}

            const token = jwt.sign(payload, process.env.SECREAT_KEY, {expiresIn:'1d'})
            
            res.status(202).send({msg:"Logged in succesfull", success:true,token:token})
        }else{
            res.status(400).send({msg:"password incorrect!!!"})
        }        
    } catch (error) {
        res.status(500).send({msg:"Server Error"})
    }
}

const getUserInfo = async(req,res) =>{
    try{

    }catch(error){
        res.status(500).send({msg:"Server Error"})
    }
}


module.exports = {register, login}