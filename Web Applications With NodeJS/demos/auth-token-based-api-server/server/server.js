const config = require('./config');

Promise.resolve()
    .then(() => require('./database')(config.CONNECTION_STRING))
    .then((database) => require('./data')(database))
    .then((data) => require('./app')(data))
    .then((app) => {
        console.log('STILL HERE')
            // eslint-disable-next-line
        console.log(config.PORT, "PORT")
        app.listen(config.PORT, () => console.log(`Server running on port ${config.PORT}..`));
    });