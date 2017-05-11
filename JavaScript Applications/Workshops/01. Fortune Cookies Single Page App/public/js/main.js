'use strict';

const sammyApp = new Sammy('#content', function() {
    const $content = $('#content');

    this.get('#/login', function(context) {

        templateLoader.load('login')
            .then(function(template) {
                $content.html(template);

                const $usernameInput = $('#tb-username'),
                    $passwordInput = $('#tb-password');

                $('#btn-register').on('click', function() {
                    if (!validator.isValidUserName($usernameInput.val())) {
                        utils.popupMessage('Username must be between 6 and 30 symbols!', 'danger');
                        return;
                    }

                    data.users.register(getUserParams($usernameInput, $passwordInput))
                        .then(() => utils.popupMessage('You have successfully registered, log in to continue', 'success'))
                        .then(() => context.redirect('#/'))
                        .catch(() => utils.popupMessage('User already exists!', 'danger'));
                });

                $('#btn-login').on('click', function() {
                    data.users.login(getUserParams($usernameInput, $passwordInput))
                        .then((userData) => utils.popupMessage(`User ${userData.result.username} logged succesfully!`, 'success'))
                        .then(() => context.redirect('#/'))
                        .catch(() => utils.popupMessage('Invalid username or password!', 'danger'));
                });
            });
    });

    this.get('#/', function(context) {
        context.redirect('#/home');
    });

    this.get('#/home', function(context) {

        if (data.users.isLogged()) {
            $('#btn-go-to-login').addClass('hidden');
            $('#btn-logout').removeClass('hidden');

            $('#logged-username').html(`<a href="#/users/logged">${localStorage.getItem(USERNAME_STORAGE)}</a>`);
        } else {
            $('#btn-go-to-login').removeClass('hidden');
            $('#btn-logout').addClass('hidden');
        }

        let cookies;
        data.cookies.getAll()
            .then((data) => {

                cookies = data.result;

                return templateLoader.load('home');
            })
            .then((template) => {
                $content.html(template(cookies));

                $('.btn-rating').on('click', function() {
                    if (data.users.isLogged()) {

                        const $this = $(this);
                        utils.udpateRatings($this.next());

                    }
                });
            });
    });

    this.get('#/cookies/add', function(context) {
        templateLoader.load('share-cookie')
            .then((template) => {
                $content.html(template);

                $('#btn-add-cookie').on('click', function() {

                    const cookieTitle = $('#tb-cookie-title').val(),
                        cookieImage = $('#tb-cookie-image').val(),
                        cookieCategory = $('#tb-cookie-category').val();

                    const cookie = {
                        text: cookieTitle,
                        img: cookieImage,
                        category: cookieCategory
                    };

                    data.cookies.add(cookie)
                        .then((userData) => utils.popupMessage(`Cookie was added successfully!`, 'success'))
                        .then(() => context.redirect('#/home'));
                });
            });
    });

    this.get('#/cookies/:id/:likeOrDislike', function(context) {
        const id = context.params.id,
            likeOrDislike = context.params.likeOrDislike;

        data.cookies.likeOrDislike(id, likeOrDislike);
    });

    this.get('#/my-cookie', function(context) {
        if (!data.users.isLogged()) {
            utils.popupMessage('You must be logged in to see you fortune cookie!', 'danger');
            return;
        }

        let myCookie;
        data.cookies.getMyCookie()
            .then((data) => {
                myCookie = data.result;
                return templateLoader.load('my-cookie');
            })
            .then((template) => $content.html(template(myCookie)));
    });

    this.get('#/home/:categoryName', function(context) {
        const category = context.params.categoryName;

        let cookies;
        data.cookies.getAll()
            .then((data) => {
                cookies = data.result;
                return templateLoader.load('home');
            })
            .then((template) => {

                cookies = cookies.filter(x => x.category === category);

                const $fragment = $('<div/>').html(template(cookies));

                $fragment.find('h1').html(`Cookies in ${category} category`);

                $content.html($fragment.html());
            });
    });
});

$(function() {
    sammyApp.run('#/');

    $('#btn-logout').on('click', function() {
        data.users.logout()
            .then(() => {
                $('#btn-go-to-login').removeClass('hidden');
                $('#btn-logout').addClass('hidden');

                $('#logged-username').html('Guest User');
            });
    });
});

function getUserParams(usernameInput, passwordInput) {
    return {
        username: usernameInput.val(),
        password: passwordInput.val()
    };
}