const mongo = require('mongoose');

const userSchema = new mongo.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true});

const User = mongo.model('Users',userSchema);

module.exports = User;