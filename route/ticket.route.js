const {createTicket} = require('../controller/ticket.controller');

const {verifyToken} = require('../middlewares/authJWT');

module.exports = function(app){
    app.post('/api/tasks',verifyToken,createTicket);
};