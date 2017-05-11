 const USERNAME_STORAGE = 'username-storage',
     AUTH_KEY_STORAGE = 'auth-key';

 const data = (function() {
     'use strict';

     function usersIsLogged() {
         return localStorage.getItem(USERNAME_STORAGE) || null;
     }

     function logout() {
         const promise = new Promise((resolve, reject) => {
             localStorage.removeItem(USERNAME_STORAGE);
             localStorage.removeItem(AUTH_KEY_STORAGE);
             resolve();
         });

         return promise;
     }

     function usersRegister(userInfo) {
         const promise = new Promise((resolve, reject) => {
             const registeringUser = {
                 username: userInfo.username,
                 passHash: userInfo.password
             };

             $.ajax({
                 url: 'api/users',
                 method: 'POST',
                 contentType: 'application/json',
                 data: JSON.stringify(registeringUser),
                 success: function(data) {
                     resolve(data);
                 },
                 error: function(error) {
                     reject(error);
                 }
             });
         });

         return promise;
     }

     function usersLogin(userInfo) {
         const promise = new Promise((resolve, reject) => {
             const loggingUser = {
                 username: userInfo.username,
                 passHash: userInfo.password,
             };

             $.ajax({
                 url: 'api/auth',
                 method: 'PUT',
                 contentType: 'application/json',
                 data: JSON.stringify(loggingUser),
                 success: function(data) {
                     localStorage.setItem(USERNAME_STORAGE, data.result.username);
                     localStorage.setItem(AUTH_KEY_STORAGE, data.result.authKey);
                     resolve(data);
                 },
                 error: function(error) {
                     reject(error);
                 }
             });
         });

         return promise;
     }

     function cookiesGetAll() {
         const promise = new Promise((resolve, reject) => {

             $.get('api/cookies', function(data) {
                 resolve(data);
             });
         });

         return promise;
     }

     function cookiesLikeOrDislike(cookieId, likeOrDislike) {
         const promise = new Promise((resolve, reject) => {

             const body = {
                 type: likeOrDislike
             };
             console.log(localStorage.getItem(AUTH_KEY_STORAGE));
             $.ajax({
                 url: `api/cookies/${cookieId}`,
                 method: 'PUT',
                 headers: {
                     'x-auth-key': localStorage.getItem(AUTH_KEY_STORAGE)
                 },
                 contentType: 'application/json',
                 data: JSON.stringify(body),
                 success: function(data) {
                     resolve(data);
                 },
                 error: function(err) {
                     reject(err);
                 }
             });
         });

         return promise;
     }

     function cookiesGetMyCookie() {
         const promise = new Promise((resolve, reject) => {

             $.ajax({
                 url: 'api/my-cookie',
                 method: 'GET',
                 contentType: 'applicaton/json',
                 headers: {
                     'x-auth-key': localStorage.getItem(AUTH_KEY_STORAGE),
                 },
                 success: function(data) {
                     resolve(data);
                 }
             });
         });

         return promise;
     }

     function cookiesAdd(cookie) {
         const promise = new Promise((resolve, reject) => {
             $.ajax({
                 url: 'api/cookies',
                 method: 'POST',
                 contentType: 'application/json',
                 data: JSON.stringify(cookie),
                 headers: {
                     'x-auth-key': localStorage.getItem(AUTH_KEY_STORAGE),
                 },
                 success: function(data) {
                     resolve(data);
                 }
             });
         });

         return promise;
     }

     return {
         users: {
             login: usersLogin,
             register: usersRegister,
             isLogged: usersIsLogged,
             logout: logout
         },
         cookies: {
             getAll: cookiesGetAll,
             likeOrDislike: cookiesLikeOrDislike,
             add: cookiesAdd,
             getMyCookie: cookiesGetMyCookie
         }
     };
 })();