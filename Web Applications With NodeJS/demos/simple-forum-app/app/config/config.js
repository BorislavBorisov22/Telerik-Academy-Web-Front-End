/* globals __dirname */

const path = require('path');
const fs = require('fs');

const configurate = (app) => {
    fs.readdirSync(__dirname)
        .filter((f) => f.includes('.config'))
        .forEach((fileName) => {
            const filePath = path.join(__dirname, fileName);
            require(filePath)(app);
        });
};

module.exports = configurate;
