const data = require('./data')();

const app = require('./config/application')(data);

require('./config/sockets')(app);

require('./routers')({ app, data });

app.listen(3003, () => console.log('Server listening on port 3003'));
