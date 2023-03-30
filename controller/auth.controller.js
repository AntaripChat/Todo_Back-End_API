
const User = require('../model/user.model');
const bcrypt = require('bcrypt');
exports.signUp = async (req,res) =>{
    const userObj={
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password, 8)
    };
    try{
        const user = await User.create(userObj);
        console.log(user);
    }catch(err){
        console.log(err);
    }
}