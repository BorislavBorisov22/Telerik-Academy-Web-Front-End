import { controllers } from 'controllers';
import { data } from 'data';
import { templateLoader } from 'template-loader';

const controller = controllers.get(data, templateLoader);

const sammyApp = new Sammy(function() {

    this.get('#/login', controller.login);

    this.get('#/home', controller.home);

    this.get('#/posts/add', controller.addPost);

    this.get('#/logout', controller.logout);

    this.get('#/', function(context) {
        context.redirect('#/home');
    });
});

sammyApp.run('#/');