'use strict';

const data = (function() {

    const USERNAME_STORAGE_KEY = 'username-key',
        AUTH_KEY_STORAGE_KEY = 'auth-key';

    function userLogin(user) {

        const promise = new Promise((resolve, reject) => {
            const loginUser = {
                username: user.username,
                passHash: CryptoJS.SHA1(user.password).toString()
            };
            console.log('here');
            console.log(user);
            console.log(loginUser);

            $.ajax({
                url: 'api/auth',
                type: 'PUT',
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify(loginUser),
                success: function(user) {
                    localStorage.setItem(AUTH_KEY_STORAGE_KEY, user.authKey);
                    localStorage.setItem(USERNAME_STORAGE_KEY, user.username);

                    resolve(user);
                },
                error: function(err) {
                    reject(err);
                }
            });
        });

        return promise;
    }

    function userRegister(user) {
        const promise = new Promise((resolve, reject) => {
            const regUser = {
                username: user.username,
                passHash: CryptoJS.SHA1(user.password).toString()
            };

            $.ajax({
                url: 'api/users',
                type: 'POST',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(regUser),
                success: function(user) {
                    localStorage.setItem(AUTH_KEY_STORAGE_KEY, user.authkey);
                    localStorage.setItem(USERNAME_STORAGE_KEY, user.username);
                    resolve(user);
                },
                error: function(err) {
                    reject(err);
                }
            });
        });

        return promise;
    }

    function userLogout() {
        const promise = new Promise((resolve, reject) => {
            localStorage.removeItem(AUTH_KEY_STORAGE_KEY);
            localStorage.removeItem(USERNAME_STORAGE_KEY);
            resolve();
        });

        return promise;
    }

    function userFind() {

    }

    function getCurrentUser() {
        const username = localStorage.getItem(USERNAME_STORAGE_KEY);

        return username || null;
    }

    function threadsGet() {
        const promise = new Promise((resolve, reject) => {
            $.getJSON('api/threads', function(threads) {
                resolve(threads);
            });
        });

        return promise;
    }

    function threadsAdd(title) {
        const promise = new Promise((resolve, reject) => {
            $.ajax({
                url: 'api/threads',
                method: 'POST',
                data: JSON.stringify({ title }),
                contentType: 'application/json',
                success: function(data) {
                    resolve(data);
                },
                headers: {
                    'x-authkey': localStorage.getItem(AUTH_KEY_STORAGE_KEY)
                }
            });
        });

        return promise;
    }

    function threadById(id) {
        const promise = new Promise((resolve, reject) => {
            $.getJSON(`api/threads/${id}`, function(res) {
                resolve(res);
            });
        });

        return promise;
    }

    function addMessageToThread(message, threadId) {
        const promise = new Promise((resolve, reject) => {
            $.ajax({
                url: `api/threads/${threadId}/messages`,
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ message }),
                headers: {
                    'x-authkey': localStorage.getItem(AUTH_KEY_STORAGE_KEY)
                },
                success: function(data) {
                    resolve(data);
                },
            });
        });

        return promise;
    }

    return {
        users: {
            login: userLogin,
            register: userRegister,
            find: userFind,
            logout: userLogout,
            current: getCurrentUser,
        },
        threads: {
            get: threadsGet,
            add: threadsAdd,
            getById: threadById,
            addMessageToThread: addMessageToThread
        }
    };
})();