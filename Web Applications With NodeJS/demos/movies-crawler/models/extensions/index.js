const path = require('path');

require('fs')
    .readdirSync(__dirname)
    .filter(fileName => fileName.includes('.extensions'))
    .forEach(fileName => {
        const modulePath = path.join(__dirname, fileName);
        require(modulePath);
    });