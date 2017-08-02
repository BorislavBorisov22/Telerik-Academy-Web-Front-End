const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

const port = process.env.PORT || 3001;

let server = null;
gulp.task('server', () => {
    const app = require('./app');
    server = app.listen(port, () => console.log('Server running at 3001'));
});

gulp.task('dev', ['server'], () => {
    return nodemon({
        ext: 'js',
        tasks: ['server'],
        script: './server.js'
    });
});