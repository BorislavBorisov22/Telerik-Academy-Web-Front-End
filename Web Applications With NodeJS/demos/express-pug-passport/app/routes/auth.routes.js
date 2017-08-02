const { Router } = require('express');
const passport = require('passport');

const attach = (app) => {
    const router = new Router();

    router
        .post('/sign-in',
            passport.authenticate('local', {
                successRedirect: '/',
                failureRedirect: '/auth/sign-in',
                failureFlash: true
            })
        )
        .get('/sign-in',(req, res) =>{
            return res.render('auth/sign-in');
        });

    app.use('/auth', router);
};

module.exports = attach;