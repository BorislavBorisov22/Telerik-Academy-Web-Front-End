const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const configAuth = (app, { users }) => {
    app.use(passport.initialize());
    app.use(passport.session());

    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromHeader('token');
    opts.secretOrKey = app.get('superSecret');


    // const headerExtractor = (req) => {
    //     let head = null;
    //     if (req && req.headers) {
    //         header = JSON.parse(req.headers['token']);
    //     }
    // };

    // opts.jwtFromRequest = ExtractJwt.fromExtractors([headerExtractor]);
    // opts.secretOrKey = 'ilovescotchyscotch';
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log(jwt_payload, 'playload');
        users.findById(jwt_payload._id)
            .then((user) => {
                if (user) {
                    return done(null, user);
                }

                return done(null, false);
            })
            .catch((err) => {
                done(err, false);
            });
    }));

    passport.serializeUser((user, done) => {
        if (user) {
            return done(null, user._id);
        }

        return done(null, null);
    });

    passport.deserializeUser((id, done) => {
        userData
            .findById(id)
            .then(user => {
                if (!user) {
                    return done(null, false);
                }

                return done(null, user);
            })
            .catch(err => {
                done(err, false);
            });
    });
};

module.exports = configAuth;