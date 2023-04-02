const mongo = require('mongoose');
//mongodb+srv://todo:<password>@cluster0.mgkhtei.mongodb.net/?retryWrites=true&w=majority
//mongodb://127.0.0.1:27017/todo
mongo.connect('mongodb+srv://todo:todo123@cluster0.mgkhtei.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    console.log("DB Connect");
}).catch((err)=>{
    console.log(err);
});           