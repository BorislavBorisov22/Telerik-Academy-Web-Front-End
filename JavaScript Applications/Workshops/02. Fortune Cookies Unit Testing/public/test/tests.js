mocha.setup('bdd');

const { expect, assert } = chai;

describe('dataService tests', function() {

    describe('cookies tests', function() {
        beforeEach(function() {
            sinon.stub(requester, 'getJSON')
                .returns(new Promise((resolve, reject) => {
                    resolve(true);
                }));
        });

        afterEach(function() {
            requester.getJSON.restore();
        });

        it('expect dataService.cookies to call requester.getJSON once', function(done) {
            dataService.cookies()
                .then((data) => {
                    const calledOnce = requester.getJSON.calledOnce;

                    expect(calledOnce).to.be.true;
                })
                .then(done, done);
        });

        it('expect dataService.cookies to call requester.getJSON with the valid url for all cookies', function(done) {
            dataService.cookies()
                .then((data) => {
                    const calledWithValidUrl = requester.getJSON.calledWith('/api/cookies');

                    expect(calledWithValidUrl).to.be.true;
                })
                .then(done, done);
        });
    });

    describe('register tests', function() {
        beforeEach(function() {
            sinon.stub(requester, 'postJSON', function(url, user) {
                return new Promise((resolve, reject) => {
                    resolve(user);
                });
            });
        });

        afterEach(function() {
            requester.postJSON.restore();
        });

        it('expect register to call requester.postJSON once', function(done) {
            const user = {
                username: 'someUsername',
                passHash: 'somePassword'
            };

            dataService.register(user)
                .then((user) => {
                    const calledOnce = requester.postJSON.calledOnce;

                    expect(calledOnce).to.be.true;
                })
                .then(done, done);
        });

        it('expect register to call requester.postJSON with the the same passed user', function(done) {
            const user = {
                username: 'someUsername',
                passHash: 'somePassword'
            };

            dataService.register(user)
                .then(() => {
                    const calledUser = requester.postJSON.firstCall.args[1];

                    expect(calledUser).to.eql(user);
                })
                .then(done, done);
        });


        it('expect register to call requester.postJSON with the valid url for user registration', function(done) {
            const user = {
                username: 'someUsername',
                passHash: 'somePassword'
            };

            const expectedURl = '/api/users';

            dataService.register(user)
                .then(() => {
                    const actualUrl = requester.postJSON.firstCall.args[0];

                    expect(expectedURl).to.equal(actualUrl);
                })
                .then(done, done);
        });
    });

    describe('login tests', function() {
        const AUTH_KEY = 'SOMEveryVerylongAndCompleAuthneticationKEy';

        beforeEach(function() {
            sinon.stub(requester, 'putJSON', function(url, user) {
                const promise = new Promise((resolve, reject) => {
                    resolve({
                        result: {
                            username: user.username,
                            authKey: AUTH_KEY
                        }
                    });
                });

                return promise;
            });
        });

        afterEach(function() {
            requester.putJSON.restore();
        });

        it('expect login to call requester.putJSON once', function(done) {
            const loggingUser = {
                username: 'some-username',
                passHash: 'some-pass-hash'
            };

            dataService.login(loggingUser)
                .then((user) => {
                    const calledOnce = requester.putJSON.calledOnce;

                    expect(calledOnce).to.be.true;
                })
                .then(done, done);
        });

        it('expect login to call requester.putJSON with the correct url for logging a user', function(done) {
            const loggingUser = {
                username: 'some-username',
                passHash: 'some-pass-hash'
            };

            const expectedUrl = '/api/auth';

            dataService.login(loggingUser)
                .then((user) => {
                    const actualUrl = requester.putJSON.firstCall.args[0];

                    expect(actualUrl).to.be.equal(expectedUrl);
                })
                .then(done, done);
        });

        it('expect login to call requester.putJSON with the same passed user', function(done) {
            const loggingUser = {
                username: 'some-username',
                passHash: 'some-pass-hash'
            };

            dataService.login(loggingUser)
                .then((user) => {
                    const actualUser = requester.putJSON.firstCall.args[1];

                    expect(actualUser).to.be.eql(loggingUser);
                })
                .then(done, done);
        });

        it('expect login to set localStorage[username] to the logged users username', function(done) {
            const loggingUser = {
                username: 'some-username',
                passHash: 'some-pass-hash'
            };
            localStorage.removeItem('username');

            dataService.login(loggingUser)
                .then((user) => {
                    const localStorageUsername = localStorage.getItem('username');

                    expect(localStorageUsername).to.equal(loggingUser.username);
                })
                .then(done, done);
        });

        it('expect login to set localStorage[authKey] to the logged users authentication key', function(done) {
            const loggingUser = {
                username: 'some-username',
                passHash: 'some-pass-hash'
            };
            localStorage.removeItem('authKey');

            dataService.login(loggingUser)
                .then((user) => {
                    const localStorageAuthKey = localStorage.getItem('authKey');

                    expect(AUTH_KEY).to.equal(localStorageAuthKey);
                })
                .then(done, done);
        });
    });

    describe('logout tests', function() {

        beforeEach(function() {
            localStorage.setItem('username', 'someUsername');
            localStorage.setItem('authKey', 'someAuthenticationKey');
        });

        afterEach(function() {
            localStorage.removeItem('username', 'someUsername');
            localStorage.removeItem('authKey', 'someAuthenticationKey');
        });

        it('expect logout to clear localStorage[username]', function(done) {
            dataService.logout()
                .then(() => {
                    const localStorageUsername = localStorage.getItem('username');
                    expect(localStorageUsername).to.be.a('null');
                })
                .then(done, done);


        });

        it('expect logout to clear localStorage[authKey]', function(done) {
            dataService.logout()
                .then(() => {
                    const localStorageAuthKey = localStorage.getItem('authKey');

                    expect(localStorageAuthKey).to.be.a('null');
                })
                .then(done, done);
        });
    });

    describe('isLoggedIn tests', function() {
        it('expect to return true when there is a user logged in', function(done) {
            localStorage.setItem('username', 'someUsername');

            dataService.isLoggedIn()
                .then(result => {
                    expect(result).to.be.true;
                })
                .then(done, done);
        });

        it('expect to return false when there is no user logged in', function(done) {
            localStorage.removeItem('username');

            dataService.isLoggedIn()
                .then(result => {
                    expect(result).to.be.false;
                })
                .then(done, done);
        });
    });

    describe('addCookie tests', function() {
        const AUTH_KEY = 'someAuthKey';

        const cookieToAdd = {
            category: 'SomeCAtegory',
            likes: 150,
            dislikes: 22
                // may be added some more :)
        };

        beforeEach(function() {
            sinon.stub(requester, 'postJSON', function(url, cookie, options) {
                return new Promise((resolve, reject) => {
                    resolve(cookie);
                });
            });

            localStorage.setItem('authKey', AUTH_KEY);
        });

        afterEach(function() {
            requester.postJSON.restore();
            localStorage.removeItem('authKey');
        });

        it('expect to call requester.postJSON once', function(done) {

            dataService.addCookie(cookieToAdd)
                .then(() => {
                    const calledOnce = requester.postJSON.calledOnce;

                    expect(calledOnce).to.be.true;
                })
                .then(done, done);
        });

        it('expect to call requester.postJSON with the correct url for adding cookie', function(done) {

            const expectedUrl = '/api/cookies';

            dataService.addCookie(cookieToAdd)
                .then(() => {
                    const actualUrl = requester.postJSON
                        .firstCall
                        .args[0];

                    expect(actualUrl).to.equal(expectedUrl);
                })
                .then(done, done);
        });

        it('expect to call requester.postJSON with the correct passed cookie for adding', function(done) {

            dataService.addCookie(cookieToAdd)
                .then(() => {
                    const actualCookie = requester.postJSON
                        .firstCall
                        .args[1];

                    expect(actualCookie).to.eql(cookieToAdd);
                })
                .then(done, done);
        });

        it('expect to call requester.postJSON with the options ojbect containing the coorect authentication key cookie for adding', function(done) {

            const expectedOptions = {
                headers: {
                    'x-auth-key': AUTH_KEY
                }
            };

            dataService.addCookie(cookieToAdd)
                .then(() => {
                    const actualOptions = requester.postJSON.firstCall.args[2];

                    expect(actualOptions).to.eql(expectedOptions);
                })
                .then(done, done);
        });
    });

    describe('rateCookie tests', function() {

        const AUTH_KEY = 'SOMEAUTHKEAY';

        beforeEach(function() {
            sinon.stub(requester, 'putJSON', function(url, { type }, options) {
                const promise = new Promise((resolve, reject) => {
                    resolve(true);
                });

                return promise;
            });

            localStorage.setItem('authKey', AUTH_KEY);
        });

        afterEach(function() {
            requester.putJSON.restore();
            localStorage.removeItem('authKey');
        });

        it('expect to call requester.putJSON once', function(done) {
            const type = 'someType';

            dataService.rateCookie(1, type)
                .then(() => {
                    const calledOnce = requester.putJSON.calledOnce;

                    expect(calledOnce).to.be.true;
                })
                .then(done, done);
        });

        it('expect to call requester.putJSON with the correct id for the target cookie', function(done) {

            const type = 'someType';
            const expectedUrl = '/api/cookies/1';

            dataService.rateCookie(1, type)
                .then(() => {
                    const actualUrl = requester.putJSON.firstCall.args[0];

                    expect(actualUrl).to.equal(expectedUrl);
                })
                .then(done, done);
        });

        it('expect requester.putJSON type parameter to be an object cotaining the passed type', function(done) {

            const type = 'someType';

            const expectedType = {
                type: type
            };

            dataService.rateCookie(1, type)
                .then(() => {
                    const actualType = requester.putJSON.firstCall.args[1];

                    expect(actualType).to.eql(expectedType);
                })
                .then(done, done);
        });

        it('expect to call the requester.POSTJSON with options object containing users authetication key', function(done) {

            const type = 'someType';

            const expectedOptions = {
                headers: {
                    'x-auth-key': AUTH_KEY
                }
            };

            dataService.rateCookie(1, type)
                .then(() => {
                    const actualOptions = requester.putJSON.firstCall.args[2];

                    expect(actualOptions).to.eql(expectedOptions);
                })
                .then(done, done);
        });
    });
});

mocha.run();