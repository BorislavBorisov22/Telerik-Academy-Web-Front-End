const express = require('express');
const data = require('./data');

const app = express();

app.get('/', (req, res) => {
    res.render('home/home');
});

require('./config')(app);
require('./routers')(app, data);

module.exports = app;
