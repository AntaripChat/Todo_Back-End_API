const app = require('./app');
const {PORT} = require('./config/server.config');
require('./config/db.config');

app.listen(PORT,()=>{
    console.log(`Running on ${PORT}`);
});