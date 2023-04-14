const {signUp,signinOtp,loginOtp} = require('../controller/auth.controller');

const {verifySignup} = require('../middlewares/verifySignup');

module.exports = function(app){
    app.post('/api/register',verifySignup,signUp);
    app.post('/api/login',signinOtp);
    app.post('/api/loginotp',loginOtp);
};

// "name":"ee",
// "email":"chatterjeeantarip1234@gmail.com",
// "password":"ac"