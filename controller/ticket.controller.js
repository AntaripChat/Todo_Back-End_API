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
};

exports.getAllTicket = async (req,res) =>{

    try{
        const ticket = await Ticket.find();
        return res.status(200).send(ticket);
    }
    catch(e){
        return res.status(500).send({message:"Internal server error"});
    }
};

exports.getTicketById = async (req,res) =>{
    try{
          const id = req.params.id;

          const ticketId = await Ticket.find({_id:id});
          
          if(!ticketId || !(ticketId.length)){
            return res.status(400).send({message:"Invalid userid passed"});
          }

          return res.status(200).send(ticketId);
    }
    catch(e){
        return res.status(500).send({message:"Internal server error"+e});
    }
};

exports.deletById = async(req,res) =>{
    try{
        const id = req.params.id;

        const ticketId = await Ticket.findByIdAndDelete({_id:id});
          

        return res.status(200).send(`${ticketId} delete`);

    }
    catch(e){
        return res.status(500).send({message:"Internal server error"+e});
    }
};

exports.updateTicketById = async (req,res)=>{
    let savedTicket = await Ticket.findOne({
        _id: req.params.id
    })

    if(!savedTicket){
        return res.status(400).send({
            msg: `Movie Id ${req.params.id} does not exist`
        })
    }

    savedTicket.title = req.body.title ?  req.body.title: savedTicket.title; 
    savedTicket.description = req.body.description ?  req.body.description : savedTicket.description; 
    

    const updateTicket = await savedTicket.save();
    res.send(updateTicket);
    
};
