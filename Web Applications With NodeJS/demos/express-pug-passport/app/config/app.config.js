const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const express = require('express');

const configApp = (app) => {

    //app.use(morgan('combined'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use('/static', express.static(path.join(__dirname, '../../static')));
    app.use('/libs', express.static(path.join(__dirname, '../../node_modules')))

    app.set('view engine', 'pug');
};

module.exports = configApp;