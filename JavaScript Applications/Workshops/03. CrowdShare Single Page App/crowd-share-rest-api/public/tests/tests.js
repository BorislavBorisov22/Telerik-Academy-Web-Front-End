'use strict';

import { data } from 'data';
import { requester } from 'requester';

mocha.setup('bdd');

const { expect, assert } = chai;

describe('Data (DataService) tests', function() {

    describe('data.registerUser tests', function() {

        const user = {
            username: 'someUsername',
            authCode: 'someAuthCode'
        };

        beforeEach(function() {
            sinon.stub(requester, 'postJSON')
                .returns(new Promise((resolve, reject) => {
                    resolve(true);
                }));
        });

        afterEach(function() {
            requester.postJSON.restore();
        });

        it('expect to call requester.postJSON once', function(done) {
            data.registerUser(user)
                .then((res) => {
                    const calledOnce = requester.postJSON.calledOnce;

                    expect(calledOnce).to.be.true;
                })
                .then(done, done);
        });

        it('expect to call requster.postJSON with the correct url for regitering a user', function(done) {
            const expectedUrl = '/user';

            data.registerUser(user)
                .then((res) => {
                    const actualUrl = requester.postJSON.firstCall.args[0];
                    console.log(actualUrl);
                    expect(expectedUrl).to.equal(actualUrl);
                })
                .then(done, done);
        });

        it('expect to call requester.PostJSON with the correct passed user', function(done) {

            data.registerUser(user)
                .then((rest) => {
                    const actualUser = requester.postJSON.firstCall.args[1];

                    expect(actualUser).to.eql(user);
                })
                .then(done, done);
        });
    });

    describe('data.loginUser tests', function() {
        const user = {
            username: 'SomeUsername',
            sessionKey: 'SomeSessionKey'
        };

        beforeEach(function() {
            sinon.stub(requester, 'postJSON')
                .returns(new Promise((resolve, reject) => {
                    resolve(user);
                }));
        });

        afterEach(function() {
            requester.postJSON.restore();
        });

        it('expect to call requester.postJSON once', function(done) {
            data.loginUser(user)
                .then((res) => {
                    const calledOnce = requester.postJSON.calledOnce;

                    expect(calledOnce).to.be.true;
                })
                .then(done, done);
        });

        it('expect to call requester.postJSON with valid login url', function(done) {
            const expectedUrl = '/auth';

            data.loginUser(user)
                .then((res) => {
                    const actualUrl = requester.postJSON.firstCall.args[0];

                    expect(actualUrl).to.equal(expectedUrl);
                })
                .then(done, done);
        });

        it('expect to call requester.postJSON with the correct passed user', function(done) {

            data.loginUser(user)
                .then((resUser) => {
                    const actualUser = requester.postJSON.firstCall.args[1];

                    expect(actualUser).to.eql(user);
                })
                .then(done, done);
        });

        it('expect to set localStorage("username") to the logged user\'s username', function(done) {
            localStorage.clear();

            data.loginUser(user)
                .then((res) => {
                    expect(localStorage.getItem('username')).to.equal(user.username);
                })
                .then(done, done);
        });

        it('exepct to set localStorage(session-key) to the logged user\'s provided session key', function(done) {
            localStorage.clear();

            data.loginUser(user)
                .then((res) => {
                    expect(localStorage.getItem('session-key')).to.equal(user.sessionKey);
                })
                .then(done, done);
        });
    });

    describe('data.isLoggedIn tests', function() {
        afterEach(function() {
            localStorage.clear();
        });

        it('expect to return false when there is no user logged in (no saved sessionKey in local storage)', function() {
            localStorage.clear();
            const isLoggedIn = data.isLoggedIn();

            expect(isLoggedIn).to.be.false;
        });

        it('expect to return true when there is a user logged in (saved sessionKey in localStorage', function() {
            localStorage.setItem('session-key', 'someSessionKey');

            const isLoggedIn = data.isLoggedIn();

            expect(isLoggedIn).to.be.true;
        });
    });

    describe('data.logoutUser tests', function() {

        beforeEach(function() {
            sinon.stub(requester, 'putJSON')
                .returns(new Promise((resolve, reject) => {
                    resolve(true);
                }));

            localStorage.setItem('username', 'someUsername');
            localStorage.setItem('session-key', 'someSessionKey');
        });

        afterEach(function() {
            requester.putJSON.restore();

            localStorage.clear();
        });

        it('expect to call requester.putJSON once', function(done) {
            data.logoutUser()
                .then((res) => {
                    const calledOnce = requester.putJSON.calledOnce;

                    expect(calledOnce).to.be.true;
                })
                .then(done, done);
        });


        it('expect to call requester.putJSON with the correct logout url', function(done) {
            const expectedUrl = '/user';

            data.logoutUser()
                .then((res) => {
                    const actualUrl = requester.putJSON.firstCall.args[0];

                    expect(actualUrl).to.equal(expectedUrl);
                })
                .then(done, done);
        });


        it('expect to call requester.putJSON with an empty object for the requests body', function(done) {
            const expectedBody = {};

            data.logoutUser()
                .then((res) => {
                    const actualBody = requester.putJSON.firstCall.args[1];

                    expect(expectedBody).to.eql(actualBody);
                })
                .then(done, done);
        });

        it('expect to call requester.putJSON with options object containing correct headers object', function(done) {
            const expectedOpions = {
                headers: {
                    'X-SessionKey': localStorage.getItem('session-key')
                }
            };

            data.logoutUser()
                .then((res) => {
                    const actualOptions = requester.putJSON.firstCall.args[2];

                    expect(expectedOpions).to.eql(actualOptions);
                })
                .then(done, done);
        });

        it('expect to clear localStorage(session-key)', function(done) {
            data.logoutUser()
                .then((res) => {
                    expect(localStorage.getItem('session-key')).to.be.a('null');
                })
                .then(done, done);
        });

        it('expect to clear localStorage(username)', function(done) {
            localStorage.setItem('username', 'someUsername');

            data.logoutUser()
                .then((res) => {
                    expect(localStorage.getItem('username')).to.be.a('null');
                })
                .then(done, done);
        });
    });

    describe('data.getAllPosts tests', function() {

        beforeEach(function() {
            sinon.stub(requester, 'get')
                .returns(new Promise((resolve, reject) => resolve(true)));
        });

        afterEach(function() {
            requester.get.restore();
        });

        it('expect to call requester.get with valid url for getting all posts', function(done) {
            data.getAllPosts()
                .then(res => {
                    const calledWithValidUrl = requester.get.calledWith('/post');

                    expect(calledWithValidUrl).to.be.true;
                })
                .then(done, done);
        });

        it('expect to call requester.get once', function(done) {
            data.getAllPosts()
                .then(res => {
                    const calledOnce = requester.get.calledOnce;

                    expect(calledOnce).to.be.true;
                })
                .then(done, done);
        });
    });

    describe('data.addPost tests', function() {
        const post = {
            title: 'somePost',
            body: 'someBody'
        };

        beforeEach(function() {
            sinon.stub(requester, 'postJSON')
                .returns(new Promise((resolve, reject) => resolve(post)));

            localStorage.setItem('session-key', 'someSessionKey');
        });

        afterEach(function() {
            requester.postJSON.restore();
            localStorage.removeItem('session-key');
        });

        it('expect to call requester.postJSON once', function(done) {
            data.addPost(post)
                .then((res) => {
                    const calledOnce = requester.postJSON.calledOnce;

                    expect(calledOnce).to.be.true;
                })
                .then(done, done);
        });

        it('expect to call requester.postJSON with valid url for adding a post', function(done) {
            const expectedUrl = '/post';

            data.addPost(post)
                .then((res) => {
                    const actualUrl = requester.postJSON.firstCall.args[0];

                    expect(actualUrl).to.equal(expectedUrl);
                })
                .then(done, done);
        });

        it('expect to call requseter.postJSON with the correct passed post to be added', function(done) {

            data.addPost(post)
                .then((res) => {
                    const actualPost = requester.postJSON.firstCall.args[1];

                    expect(actualPost).to.eql(post);
                })
                .then(done, done);
        });

        it('expect to call requseter.postJSON with options containing the valid headers object with the users sessionKey', function(done) {
            const expectedOptions = {
                headers: {
                    'X-SessionKey': localStorage.getItem('session-key')
                }
            };

            data.addPost(post)
                .then((res) => {
                    const actualOptions = requester.postJSON.firstCall.args[2];

                    expect(actualOptions).to.eql(expectedOptions);
                })
                .then(done, done);
        });
    });

    describe('data.getPostsForPage tests', function() {

        function createPost(title, date) {
            return {
                title: title,
                postDate: date
            };
        }

        afterEach(function() {
            requester.get.restore();
        });

        it('expect to call requester.get with valid url for taking all posts', function(done) {
            const posts = [];

            sinon.stub(requester, 'get')
                .returns(new Promise((resolve, reject) => {
                    resolve(posts);
                }));

            const pageSize = 1,
                pageNumber = 0,
                sortingType = "none";

            const expectedUrl = '/post';

            data.getPostsForPage(pageNumber, pageSize, sortingType)
                .then((res) => {
                    const actualUrl = requester.get.firstCall.args[0];

                    requester.get.restore();
                    expect(actualUrl).to.equal(expectedUrl);
                })
                .then(done, done);
        });

        it('expect to call requester.get once', function(done) {
            const posts = [];

            sinon.stub(requester, 'get')
                .returns(new Promise((resolve, reject) => {
                    resolve(posts);
                }));

            const pageSize = 1,
                pageNumber = 0,
                sortingType = "none";

            data.getPostsForPage(pageNumber, pageSize, sortingType)
                .then((res) => {
                    const calledOnce = requester.get.calledOnce;

                    expect(calledOnce).to.be.true;
                    requester.get.restore();
                })
                .then(done, done);
        });

        it('exepct to return the posts recieved from the requester in the same orderd when no correct sorting type is given', function(done) {
            const posts = [createPost("someTile", new Date()), createPost("otherTitle", new Date())];

            sinon.stub(requester, 'get')
                .returns(new Promise((resolve, reject) => {
                    resolve(posts);
                }));

            const pageSize = 3,
                pageNumber = 0,
                sortingType = "none";

            data.getPostsForPage(pageNumber, pageSize, sortingType)
                .then((resPosts) => {
                    expect(resPosts).to.eql(posts);
                })
                .then(done, done);
        });


        it('exepect to return the posts recieved from the requester sorted by title ascending correctly when passed sorting type Title and descending parameter is false', function(done) {
            const firstPost = createPost("aaTitle", new Date()),
                secondPost = createPost("zzTitle", new Date()),
                thirdPost = createPost("bbTitle", new Date());

            const returnedPosts = [firstPost, secondPost, thirdPost];

            const expectedPosts = [firstPost, thirdPost, secondPost];

            sinon.stub(requester, 'get')
                .returns(new Promise((resolve, reject) => {
                    resolve(returnedPosts);
                }));

            const pageSize = 3,
                pageNumber = 0,
                sortingType = "Title";

            data.getPostsForPage(pageNumber, pageSize, sortingType)
                .then((resPosts) => {
                    expect(expectedPosts).to.eql(resPosts);
                })
                .then(done, done);
        });

        it('exepect to return the posts recieved from the requester sorted by title descending correctly when passed sorting type Title and descending parameter is true', function(done) {
            const firstPost = createPost("aaTitle", new Date()),
                secondPost = createPost("zzTitle", new Date()),
                thirdPost = createPost("bbTitle", new Date());

            const returnedPosts = [firstPost, secondPost, thirdPost];

            const expectedPosts = [secondPost, thirdPost, firstPost];

            sinon.stub(requester, 'get')
                .returns(new Promise((resolve, reject) => {
                    resolve(returnedPosts);
                }));

            const pageSize = 3,
                pageNumber = 0,
                sortingType = "Title",
                descending = true;

            data.getPostsForPage(pageNumber, pageSize, sortingType, descending)
                .then((resPosts) => {
                    expect(expectedPosts).to.eql(resPosts);
                })
                .then(done, done);
        });

        it('exepect to return the posts recieved from the requester sorted by title date ascending when sortingType is Date and desceding parameter is false', function(done) {
            const firstPost = createPost("aaTitle", new Date(2016, 10, 10)),
                secondPost = createPost("zzTitle", new Date(2015, 10, 10)),
                thirdPost = createPost("bbTitle", new Date(2015, 10, 5));

            const returnedPosts = [firstPost, secondPost, thirdPost];

            const expectedPosts = [firstPost, secondPost, thirdPost];

            sinon.stub(requester, 'get')
                .returns(new Promise((resolve, reject) => {
                    resolve(returnedPosts);
                }));

            const pageSize = 3,
                pageNumber = 0,
                sortingType = "Date";

            data.getPostsForPage(pageNumber, pageSize, sortingType)
                .then((resPosts) => {
                    expect(expectedPosts).to.eql(resPosts);
                })
                .then(done, done);
        });

        it('exepect to return the posts recieved from the requester sorted by title date descending when sortingType is Date and desceding parameter is true', function(done) {
            const firstPost = createPost("aaTitle", new Date(2016, 10, 10)),
                secondPost = createPost("zzTitle", new Date(2015, 10, 10)),
                thirdPost = createPost("bbTitle", new Date(2015, 10, 5));

            const returnedPosts = [firstPost, secondPost, thirdPost];

            const expectedPosts = [thirdPost, secondPost, firstPost];

            sinon.stub(requester, 'get')
                .returns(new Promise((resolve, reject) => {
                    resolve(returnedPosts);
                }));

            const pageSize = 3,
                pageNumber = 0,
                sortingType = "Date",
                descending = true;

            data.getPostsForPage(pageNumber, pageSize, sortingType, descending)
                .then((resPosts) => {
                    expect(expectedPosts).to.eql(resPosts);
                })
                .then(done, done);
        });

        it('expect to return only the first two posts when pageNumber is zero and pageSize is two', function(done) {
            const firstPost = createPost("aaTitle", new Date(2016, 10, 10)),
                secondPost = createPost("zzTitle", new Date(2015, 10, 10)),
                thirdPost = createPost("bbTitle", new Date(2015, 10, 5)),
                fourthPost = createPost('ddTitle', new Date());

            const returnedPosts = [firstPost, secondPost, thirdPost, fourthPost];

            const expectedPosts = [firstPost, secondPost];

            sinon.stub(requester, 'get')
                .returns(new Promise((resolve, reject) => {
                    resolve(returnedPosts);
                }));

            const pageSize = 2,
                pageNumber = 0,
                sortingType = "none";

            data.getPostsForPage(pageNumber, pageSize, sortingType)
                .then((resPosts) => {
                    expect(expectedPosts).to.eql(resPosts);
                })
                .then(done, done);
        });

        it('expect to return only the second two posts when pageNumber is 1 and pageSize is two', function(done) {
            const firstPost = createPost("aaTitle", new Date(2016, 10, 10)),
                secondPost = createPost("zzTitle", new Date(2015, 10, 10)),
                thirdPost = createPost("bbTitle", new Date(2015, 10, 5)),
                fourthPost = createPost('ddTitle', new Date());

            const returnedPosts = [firstPost, secondPost, thirdPost, fourthPost];

            const expectedPosts = [thirdPost, fourthPost];

            sinon.stub(requester, 'get')
                .returns(new Promise((resolve, reject) => {
                    resolve(returnedPosts);
                }));

            const pageSize = 2,
                pageNumber = 1,
                sortingType = "none";

            data.getPostsForPage(pageNumber, pageSize, sortingType)
                .then((resPosts) => {
                    expect(expectedPosts).to.eql(resPosts);
                })
                .then(done, done);
        });

        it('expect to reject when passed pageNumber is negative number', function(done) {
            const posts = [createPost("someTile", new Date()), createPost("someOtherTitle", new Date())];

            sinon.stub(requester, 'get')
                .returns(new Promise((resolve, reject) => {
                    resolve(posts);
                }));

            const pageSize = 1,
                pageNumber = -1,
                sortingType = 'none';

            data.getPostsForPage(pageNumber, pageSize, sortingType)
                .then((resPosts) => {
                    assert.fail();
                })
                .then(done, done);
        });


        it('expect to reject when passed pageNumber is too big and would not display any post', function(done) {
            const posts = [createPost("someTile", new Date()), createPost("someOtherTitle", new Date())];

            sinon.stub(requester, 'get')
                .returns(new Promise((resolve, reject) => {
                    resolve(posts);
                }));

            const pageSize = 1,
                pageNumber = 3,
                sortingType = 'none';

            data.getPostsForPage(pageNumber, pageSize, sortingType)
                .then((resPosts) => {
                    console.log(resPosts);
                    assert.fail();
                })
                .then(done, done);
        });
    });
});

mocha.run();