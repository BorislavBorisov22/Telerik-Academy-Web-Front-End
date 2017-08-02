/* globals __dirname */

const path = require('path');
const fs = require('fs');

const attachTo = (app, data) => {
    fs.readdirSync(__dirname)
    .filter((file) => file.includes('.router'))
    .forEach((fileName) => {
        const modulePath = path.join(__dirname, fileName);
        require(modulePath).attachTo(app, data);
    });
};

module.exports = { attachTo };
