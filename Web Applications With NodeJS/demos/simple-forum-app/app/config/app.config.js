/* globals __dirname */

const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const path = require('path');

const configApp = (app) => {
    app.set('view engine', 'pug');

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(morgan('combined'));

    app.use('/libs',
        express.static(path.join(__dirname, '../../node_modules')));
    app.use('/public',
        express.static(path.join(__dirname, '../../public')));
};

module.exports = configApp;
