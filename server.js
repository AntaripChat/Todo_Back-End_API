const app = require('./app');
const {PORT} = require('./config/server.config');
require('./config/db.config');
require('./route/user.route')(app);
require('./route/ticket.route')(app);
app.listen(PORT,()=>{
    console.log(`Running on ${PORT}`);
});