const express = require('express');
const app = express();

const data = require('./data');

require('./config/app.config')(app);
require('./config/auth.config')(app, data);

app.use((req, res, next) => {
    console.log(`Current user ${JSON.stringify(req.user)}`);

    next();
});

require('./routes')(app);

app.get('/404', (req, res) => {
    return res.send('<h1>Error</h1>');
});

app.get('/', (req, res) => {
    return res.render('home');
})

module.exports = app;