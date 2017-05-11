import { requester } from 'requester';

const USERNAME_STORAGE = 'username';
const SESSION_KEY = 'session-key';

const data = (function() {

    function registerUser(user) {
        return requester.postJSON('/user', user);
    }

    function loginUser(user) {
        return requester.postJSON('/auth', user)
            .then((response) => {
                localStorage.setItem(USERNAME_STORAGE, response.username);
                localStorage.setItem(SESSION_KEY, response.sessionKey);
            });
    }

    function isLoggedIn() {
        return !!localStorage.getItem(SESSION_KEY);
    }

    function logoutUser() {
        return requester.putJSON(
                '/user', {}, {
                    headers: {
                        'X-SessionKey': localStorage.getItem(SESSION_KEY)
                    }
                })
            .then(() => {
                localStorage.removeItem(USERNAME_STORAGE);
                localStorage.removeItem(SESSION_KEY);
            });
    }

    function getAllPosts() {
        return requester.get('/post');
    }

    function getPostsForPage(pageNumber, pageSize, sortingType = "none", descending = false) {
        let posts;

        return requester.get('/post')
            .then((resPosts) => {
                posts = resPosts;
                return new Promise((resolve, reject) => {
                    if (pageNumber * pageSize >= posts.length || pageNumber < 0) {
                        reject();
                    }

                    const startIndex = pageNumber * pageSize;

                    posts = posts.slice(startIndex, startIndex + pageSize);

                    if (sortingType !== 'Title' && sortingType !== 'Date') {
                        resolve(posts);
                    }

                    posts = posts
                        .sort((a, b) => {
                            if (sortingType === 'Title') {
                                return a.title.localeCompare(b.title);
                            } else if (sortingType === 'Date') {
                                const firstDate = new Date(a.postDate);
                                const secondDate = new Date(a.postDate);

                                console.log('sorting for the dates');
                                if (firstDate > secondDate) {
                                    return 1;
                                } else if (firstDate < secondDate) {
                                    return -1;
                                } else {
                                    return 0;
                                }
                            }
                        });

                    if (descending) {
                        posts.reverse();
                    }

                    resolve(posts);
                });
            });
    }

    function addPost(post) {
        const options = {
            headers: {
                'X-SessionKey': localStorage.getItem(SESSION_KEY)
            }
        };

        return requester.postJSON('/post', post, options);
    }

    return {
        registerUser,
        loginUser,
        isLoggedIn,
        logoutUser,
        getAllPosts,
        addPost,
        getPostsForPage
    };
})();

export { data };