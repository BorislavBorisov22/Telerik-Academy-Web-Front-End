const expres = require('express');
const path = require('path');

module.exports = (data) => {
    const app = expres();

    app.set('view engine', 'pug');

    app.use('/static', expres.static(path.join(__dirname, '/public')));

    require('./passport')({ app, data });

    return app;
};
