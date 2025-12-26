const jwt = require('jsonwebtoken')
require('dotenv').config()

function auth(req,res,next){

    console.log(req.headers.authorization,"***********?????????????????")
    token = req.headers.authorization
    if(token.startsWith('Bearer')){
        console.log(token,"_________Token_______")
        token = token.split(' ')[1]
        console.log(token, "after removing bearer")

        decoded = jwt.decode(token, process.env.SECREAT_KEY)
        console.log("--------decoded---------",decoded)
        req.user = decoded
    next()

    }else{
        res.status(400).send({msg:"auth hearer bearer missing",success:false})
    }

}


module.exports = {auth}