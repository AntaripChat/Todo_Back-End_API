const app = require('./app');
const {PORT} = require('./config/server.config');

app.listen(PORT,()=>{
    console.log(`Running on ${PORT}`);
});