const User = require('../model/user.model');

const verifySignup = async (req,res,next) =>{
    if(!req.body.name){
        return res.status(400).send({message:"enter name"});
    };

    if(!req.body.email){
        return res.status(400).send({message:"enter email"});
    };

    let email = await User.findOne({email:req.body.email});
    console.log(email);
    if(email != null){
        return res.status(400).send({message:"Email already exists"});
    };

    next();
};

module.exports = {
    verifySignup,
}