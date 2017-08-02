const { Router } = require('express');
const passport = require('passport');

module.exports = ({ data, app, io }) => {
    const authController = {
        getSignInForm(req, res) {
            return res.render('auth/sign-in');
        },
        getSingUpForm(req, res) {
            return res.render('auth/sign-up');
        },
        signUp(req, res) {
            const user = req.body;

            data.createUser(user.username, user.password)
                .then(() => {
                    console.log(`${user.username} created!`);
                    return res.redirect('/home');
                });
        },
        signIn(req, res) {
            passport.authenticate("local", { failureRedirect: "/auth/sign-in" }),
                (req, res) => res.redirect("/");
        },
    };

    const authRouter = new Router();

    authRouter.get('/sign-in', authController.getSignInForm)
        .get('/sign-up', authController.getSingUpForm)
        .post('/sign-up', authController.signUp)
        .post('/sign-in', authController.signIn);

    app.use('/auth', authRouter);

    return {

    };
};
