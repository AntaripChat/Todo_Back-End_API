//const User = require('../model/user.model');
const Ticket = require('../model/ticket.model');

exports.createTicket = async(req,res) =>{
    const ticketObj={
        title:req.body.title,
        description:req.body.description,
        created_by:req.email,
    };


    try{
        const ticket = await Ticket.create(ticketObj);

        return res.status(201).send(ticket);
    }catch(e){
        return res.status(500).send({message:"Internal Server Error!"});
    }
}