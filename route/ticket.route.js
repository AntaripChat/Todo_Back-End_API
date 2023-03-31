const {createTicket,getAllTicket,getTicketById,deletById,updateTicketById} = require('../controller/ticket.controller');

const {verifyToken} = require('../middlewares/authJWT');

module.exports = function(app){
    app.post('/api/tasks',verifyToken,createTicket);
    app.get('/api/tasks',verifyToken,getAllTicket);
    app.get('/api/tasks/:id',verifyToken,getTicketById);
    app.delete('/api/tasks/:id',verifyToken,deletById);
    app.put('/api/tasks/:id',verifyToken,updateTicketById)
    
};