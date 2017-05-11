import { templateLoader } from 'template-loader';
import { data } from 'data';
import { validator } from 'validator';

class UserController {
    login(context) {
        const self = this;

        templateLoader.load('login')
            .then(template => {
                $('#container').html(template());

                $('#btn-login').on('click', function() {
                    const user = self.getUserInfo();

                    data.userLogin(user)
                        .then(() => {
                            context.redirect('#/home');
                            toastr.success(`User ${user.username} logged in successfully!`);
                        })
                        .catch(() => {
                            toastr.error('', 'Invalid username or password!');
                        });
                });

                $('#btn-register').on('click', function() {
                    const user = self.getUserInfo();

                    const promises = [data.userRegister(user), validator.validateUserInfo(user)];

                    Promise.all(promises)
                        .then(() => {
                            context.redirect('#/home');
                            toastr.success(`User ${user.username} registered successfully!`);
                        })
                        .catch((err) => {

                            if (err.getResponseHeader) {
                                toastr.error('Username is alread taken!');
                            } else {
                                toastr.error(err);
                            }
                        });
                });
            });
    }

    logout(context) {
        data.userLogout()
            .then(() => {
                toastr.success('You have logged out successfully');
                context.redirect('#/home');
            })
            .catch(() => {
                toastr.error('Please try againg later', 'There was an error loggin you out!');
            });
    }

    getUserInfo() {
        const username = $('#tb-username').val();
        const password = $('#tb-password').val();

        const user = {
            username,
            password
        };

        return user;
    }
}

const userController = new UserController();

export { userController };