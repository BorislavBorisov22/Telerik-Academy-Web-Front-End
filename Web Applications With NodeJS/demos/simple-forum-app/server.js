/* globals process */

// eslint-disable-next-line no-process-env
const port = process.env.PORT || 2001;

const app = require('./app');

app.listen(port, () => {
    console.log(`App listening on port ${port}... ;)`);
});
