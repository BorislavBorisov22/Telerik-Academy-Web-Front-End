const passport = require('passport');
const { Strategy } = require('passport-local');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const configAuth = (app, { users }) => {
    passport.use(new Strategy(
        (username, password, done) => {
            users.findByUsername((username))
                .then((user) => {
                    if (user.password !== password) {
                        return done(new Error('Invalid username or password!'));
                    }

                    return done(null, user);
                })
                .catch((err) => {
                    return done(err);
                });
        }
    ));

    app.use(cookieParser());
    app.use(session({ secret: 'Purple unicorn' }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        return users.findById(id)
            .then((user) => {
                done(null, user);
            })
            .catch(done);
    });
};

module.exports = configAuth;