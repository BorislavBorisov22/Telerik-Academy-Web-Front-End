/* global  __dirname */

const path = require('path');
const fs = require('fs');

const attachRoutes = (app, data) => {
    fs.readdirSync(__dirname)
        .filter((f) => f.includes('.routes'))
        .forEach((fileName) => {
            const filePath = path.join(__dirname, fileName);
            require(filePath)(app, data);
        });
};

module.exports = attachRoutes;
