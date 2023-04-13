
const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {secret} = require('../config/auth.config');
const {sendEmail} = require('../utlis/sendMail');
const {userRegistration} = require('../script/mailScript')


exports.signUp = async (req,res) =>{
    const userObj={
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password, 8)
    };
    console.log(userObj);
    try{
        const user = await User.create(userObj);
        res.status(201).send(`${user.name} your data saved`)
        console.log(user.email);

        const {subject,html} = userRegistration(user);

        sendEmail([user.email],subject,html);
        
        //sendEmail(user.email,"account",`hey ${user.name} your account has been created, thank you`)
        
    }catch(err){
        console.log(err);
        res.status(500).send({message:"Some Server Error",err});
    }
};

exports.signin = async (req,res) =>{
    const user = await User.findOne({email:req.body.email});
    if(user === null){
        return res.status(400).send({message:"invalid creds"});
    };

    const isPasswordValid = bcrypt.compareSync(req.body.password,user.password);
    if(!isPasswordValid){
        return res.status(400).send({message:"invalid creds"});
    };

    let token = jwt.sign({email:user.email},secret,{expiresIn:86400});

    res.status(200).send({
        name:user.name,
        email:user.email,
        accessToken:token
    });
};