
const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {secret} = require('../config/auth.config');


exports.signUp = async (req,res) =>{
    const userObj={
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password, 8)
    };
    try{
        const user = await User.create(userObj);
        //console.log(user);
        res.status(201).send(`${user.name} your data saved`)
    }catch(err){
        //console.log(err);
        res.status(500).send({message:"Some Server Error"});
    }
};

exports.signin = async (req,res) =>{
    const user = await User.findOne({email:req.body.email});
    if(user === null){
        return res.status(400).send({message:"invalid User"});
    };

    const isPasswordValid = bcrypt.compareSync(req.body.password,user.password);
    if(!isPasswordValid){
        return res.status(400).send({message:"invalid Password"});
    };

    let token = jwt.sign({email:user.email},secret,{expiresIn:86400});

    res.status(200).send({
        name:user.name,
        email:user.email,
        accessToken:token
    });
};