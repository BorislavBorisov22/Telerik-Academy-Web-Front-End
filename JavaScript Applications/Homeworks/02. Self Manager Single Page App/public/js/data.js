import { requester } from 'requester';

const AUTH_KEY_STORAGE = 'auth-key';
const USERNAME_STORAGE = 'username';

class Data {
    userRegister(user) {
        const regUser = {
            username: user.username,
            passHash: user.password
        };


        return requester.postJSON('/api/users', regUser)
            .then((data) => {
                this.saveUserInfo(data.result);
            });
    }

    userLogin(user) {

        const loggingUser = {
            username: user.username,
            passHash: user.password
        };

        return requester.putJSON('/api/users/auth', loggingUser)
            .then((data) => {
                this.saveUserInfo(data.result);
            });
    }

    userIsLogged() {
        const isLogged = localStorage.getItem(AUTH_KEY_STORAGE) && localStorage.getItem(USERNAME_STORAGE);
        return isLogged;
    }

    userLogout() {
        return new Promise((resolve, reject) => {
            this.clearUserInfo();
            resolve();
        });
    }

    userGetAll() {
        return requester.getJSON('/api/users');
    }

    saveUserInfo(userInfo) {
        const { authKey, username } = userInfo;

        localStorage.setItem(AUTH_KEY_STORAGE, authKey);
        localStorage.setItem(USERNAME_STORAGE, username);
    }

    clearUserInfo() {
        localStorage.removeItem(AUTH_KEY_STORAGE);
        localStorage.removeItem(USERNAME_STORAGE);
    }

    todoGetAll() {
        const headers = {
            'x-auth-key': localStorage.getItem(AUTH_KEY_STORAGE)
        };

        return requester.getJSON('/api/todos', headers);
    }

    todoAdd(todo) {
        const headers = {
            'x-auth-key': localStorage.getItem(AUTH_KEY_STORAGE)
        };

        return requester.postJSON('/api/todos', todo, headers);
    }

    todoSwapState(todoId, currentState) {
        const headers = {
            'x-auth-key': localStorage.getItem(AUTH_KEY_STORAGE)
        };

        const newState = currentState === "false" ? true : false;

        const body = {
            state: newState
        };

        return requester.putJSON(`/api/todos/${todoId}`, body, headers);
    }

    eventsGetAll() {
        const headers = {
            'x-auth-key': localStorage.getItem(AUTH_KEY_STORAGE)
        };

        return requester.getJSON('/api/events', headers);
    }

    eventsAdd(event) {
        const headers = {
            'x-auth-key': localStorage.getItem(AUTH_KEY_STORAGE)
        };

        return requester.postJSON('/api/events', event, headers);
    }
}

const data = new Data();

export { data };