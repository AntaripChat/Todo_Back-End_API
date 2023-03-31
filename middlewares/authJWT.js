const jwt = require("jsonwebtoken");
const {secret} = require("../config/auth.config");
const User = require("../model/user.model");

exports.verifyToken = (req,res,next)=> {

    let token = req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({message:"No Token Provided"});
    }

    jwt.verify(token,secret,(err,payload) => {

        if(err){
            return res.status(403).send({message:"Invalid JWT token"});
        }

        req.email = payload.email;
        next();
    })

}