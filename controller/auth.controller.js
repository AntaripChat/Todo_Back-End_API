
const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {secret} = require('../config/auth.config');
const {sendEmail} = require('../utlis/sendMail');
const {userRegistration,otpMail} = require('../script/mailScript')


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


exports.signinOtp = async(req,res) =>{
   try{

    const user = await User.findOne({email:req.body.email});

    if(user === null){
        return res.status(400).send({message:"invalid creds"});
    };
    const otp = Math.floor(Math.random()*10000);

    user.otp = otp;
    user.otp_expiry = Date.now() + 60000;

    await user.save();

    const {subject,html} = otpMail(user,otp);
    sendEmail([user.email],subject,html);
    res.status(200).send({msg:"Opt send"});

    }catch(er){

        res.status(500).send({msg:"Some error"});
    }

};

exports.loginOtp = async(req,res)=>{
    try{
        const user = await User.findOne({
            otp:req.body.otp,
            otp_expiry:{$gt:Date.now()},
        });


        if(user === null){
            return res.status(400).send({msg:"Not OTP found"});
        };

        user.otp = null;
        user.otp_expiry = null;

        await user.save();

        res.status(200).send({
            name:user.name,
            email:user.email
        });
    }catch(er){
        res.status(500).send({msg:"Some error"});
    }
}