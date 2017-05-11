import { userController } from 'user-controller';
import { homeController } from 'home-controller';
import { todoController } from 'todo-controller';
import { eventsController } from 'events-controller';
import { data } from 'data';


const router = new Sammy(function() {
    this.before(function() {
        toggleUserInfoDisplay();
    });

    this.get('#/home', function(context) {
        homeController.showHomePage(context);
    });

    this.get('#/todos', function(context) {
        todoController.showTodosPage(context);
    });

    this.get('#/events', function(context) {
        eventsController.showEventsPage(context);
    });

    this.get('#/todos/add', function(context) {
        todoController.showAddTodoPage(context);
    });

    this.get('#/events/add', function(context) {
        eventsController.showAddEventPage(context);
    });

    this.get('#/login', function(context) {
        userController.login(context);
    });

    this.get('#/logout', function(context) {
        userController.logout(context);
    });

    this.get('#/todos/update', function(context) {
        todoController.swapTodoState(context);
    });
});

function toggleUserInfoDisplay() {
    if (data.userIsLogged()) {
        $('#go-to-todo-list').removeClass('hidden');
        $('#go-to-events-list').removeClass('hidden');

        $('#user-info').removeClass('hidden')
            .children()
            .first()
            .html(`Hello, ${localStorage.getItem('username')}`);
        $('#go-to-logout').removeClass('hidden');
        $('#go-to-login').addClass('hidden');
    } else {
        $('#go-to-todo-list').addClass('hidden');
        $('#go-to-events-list').addClass('hidden');
        $('#user-info').addClass('hidden');
        $('#go-to-logout').addClass('hidden');
        $('#go-to-login').removeClass('hidden');
    }
}


router.run('#/home');