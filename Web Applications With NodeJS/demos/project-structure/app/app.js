const express = require('express');
const bodyParser = require('body-parser');

const init = (data) => {
    const app = express();
    app.set('view engine', 'pug');

    app.use('/libs', express.static('../node_modules'));

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    require('./routers').attachTo(app, data);
    return Promise.resolve(app);
};

module.exports = { init };
