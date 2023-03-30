const {signUp,signin} = require('../controller/auth.controller');

const {verifySignup} = require('../middlewares/verifySignup');

module.exports = function(app){
    app.post('/api/register',verifySignup,signUp);
    app.post('/api/login',signin);
}