const mongo = require('mongoose');

const taskSchema = new mongo.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },

});

const taskModel = mongo.Model('Task',taskSchema);
