const mongo = require('mongoose');

const ticketSchema = new mongo.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    created_by:{
        type:String,
    },
    // completed:{
    //     type:Boolean,
    //     required:true,
    // },


},{timestamps:true});

const ticketModel = mongo.model('Ticket',ticketSchema);

module.exports = ticketModel;
