const path = require('path');
const fs = require('fs');

const attachRoutes = (app) => {
    fs.readdirSync(__dirname)
    .filter((file) => file.includes('routes'))
    .forEach((fileName) => {
        const filePath = path.join(__dirname, fileName);
        require(filePath)(app);
    });
};

module.exports = attachRoutes;