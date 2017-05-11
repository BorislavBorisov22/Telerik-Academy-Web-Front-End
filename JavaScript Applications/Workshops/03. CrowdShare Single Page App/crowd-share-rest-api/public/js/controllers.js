const controllers = (function() {
    'use strict';

    const INITIAL_PAGE_SIZE = 4;
    let pageSize = INITIAL_PAGE_SIZE;

    function get(dataService, templateLoader) {
        function login() {
            templateLoader.load('login')
                .then(template => {
                    $('#content').html(template());
                })
                .then(() => {
                    $('#btn-register').on('click', function() {
                        const username = $('#tb-username').val();
                        const password = $('#tb-password').val();

                        const regUser = {
                            username: username,
                            authCode: CryptoJS.SHA1(username + password).toString()
                        };

                        dataService.registerUser(regUser)
                            .then(res => {
                                toastr.success('Please login to continue', 'Register Success!');
                                $('#tb-username').val('');
                                $('#tb-password').val('');
                            })
                            .catch(() => {
                                toastr.error('Invalid username or password!');
                            });
                    });

                    $('#btn-login').on('click', function() {
                        const username = $('#tb-username').val();
                        const password = $('#tb-password').val();

                        const loginUser = {
                            username: username,
                            authCode: CryptoJS.SHA1(username + password).toString()
                        };

                        dataService.loginUser(loginUser)
                            .then(res => {
                                toastr.success('', 'Login Success!');
                                document.location = '#/home';
                            })
                            .catch(() => {
                                toastr.error('Invalid username or password!');
                            });
                    });
                });
        }

        function home() {

            if (dataService.isLoggedIn()) {
                $('#login').addClass('hidden');
                $('#logout').removeClass('hidden');
                $('#btn-add-post').removeClass('hidden');
            } else {
                $('#login').removeClass('hidden');
                $('#logout').addClass('hidden');
                $('#btn-add-post').addClass('hidden');
            }

            let pageNumber = 0;
            let pageSize = INITIAL_PAGE_SIZE;
            let postsToShow;
            let templateCache;
            let sortingType = "none";
            let descending = false;

            dataService.getPostsForPage(pageNumber, pageSize, sortingType, false)
                .then(posts => {
                    postsToShow = posts;

                    return templateLoader.load('posts');
                })
                .then(template => {
                    templateCache = template;
                    $('#content').html(template(postsToShow));
                })
                .then(() => {
                    $('#content').on('click', '#next-page', function() {
                        pageNumber += 1;

                        showPagePosts(pageNumber, pageSize, templateCache, sortingType, descending)
                            .catch(() => {
                                pageNumber -= 1;
                            });
                    });

                    $('#content').on('click', '#prev-page', function() {
                        pageNumber -= 1;

                        showPagePosts(pageNumber, pageSize, templateCache, sortingType, descending)
                            .catch(() => {
                                pageNumber = 0;
                            });
                    });

                    $('#content').on('click', '.p-size', function() {
                        const $this = $(this);

                        pageSize = Number($this.html());

                        showPagePosts(pageNumber, pageSize, templateCache, sortingType, descending)
                            .catch(() => {
                                toastr.error(`cannot display ${pageSize} posts on current page!`, `Limit already reached!`);
                            });
                    });

                    $('#content').on('click', '#sort-posts-by-title', function() {
                        sortingType = 'Title';

                        if ($('#descending').prop('checked')) {
                            descending = true;
                        } else {
                            descending = false;
                        }

                        showPagePosts(pageNumber, pageSize, templateCache, sortingType, descending);
                    });

                    $('#content').on('click', '#sort-posts-by-default', function() {
                        descending = false;
                        sortingType = 'none';
                        console.log('here');
                        showPagePosts(pageNumber, pageSize, templateCache, sortingType, descending);
                    });

                    $('#content').on('click', '#sort-posts-by-date', function() {
                        sortingType = 'Date';

                        if ($('#descending').prop('checked')) {
                            descending = true;
                        } else {
                            descending = false;
                        }

                        showPagePosts(pageNumber, pageSize, templateCache, sortingType, descending);
                    });
                })
                .catch(() => {
                    toastr.error("No next/previous page available!");
                });

            // dataService.getAllpost()
            //     .then((respPosts) => {
            //         posts = respPosts;

            //         return templateLoader.load('posts');
            //     })
            //     .then(((template) => {
            //         showPosts(page, pageSize, posts, template);

            //         $('#content').on('click', '.p-size', function() {
            //             const $this = $(this);

            //             pageSize = Number($this.html());

            //             showPosts(page, pageSize, posts, template);
            //             $('#page-size-select').val(pageSize);
            //         });

            //         $('#content').on('click', '#next-page', function() {
            //             if ((page + 1) * pageSize >= posts.length) {
            //                 return;
            //             }

            //             page += 1;
            //             showPosts(page, pageSize, posts, template);
            //         });

            //         $('#content').on('click', '#prev-page', function() {
            //             if (page - 1 < 0) {
            //                 return;
            //             }

            //             page -= 1;
            //             showPosts(page, pageSize, posts, template);
            //         });

            //         $('#content').on('click', '#sort-posts-by-title', function() {
            //             page = 0;

            //             posts.sort((a, b) => {
            //                 return a.title.localeCompare(b.title);
            //             });

            //             if ($('#descending').prop('checked')) {
            //                 posts.reverse();
            //                 posts.forEach(x => console.log(x.title));
            //             }

            //             showPosts(page, pageSize, posts, template);
            //         });

            //         $('#content').on('click', '#sort-posts-by-date', function() {

            //         });

            //         $('#content').on('click', '#sort-posts-by-default', function() {
            //             document.location.reload(true);
            //         });
            //     }));
        }

        function showPagePosts(pageNumber, pageSize, template, sortingType, descending = false) {
            return dataService.getPostsForPage(pageNumber, pageSize, sortingType, descending)
                .then((posts) => {
                    $('#content').html(template(posts));
                    $('#page-size-select').val(pageSize);
                    if (descending) {
                        $('#descending').prop('checked', 'true');
                    }
                });
        }

        function addPost() {
            templateLoader.load('add-post')
                .then((template) => {
                    $('#content').html(template());

                    $('#add-post').on('click', function() {
                        const title = $('#tb-post-title').val().trim();
                        const content = $('#tb-post-content').val().trim();

                        if (title === '' || content === '') {
                            toastr.error('Post bust have title and content!');
                            return;
                        }

                        const post = {
                            title: title,
                            body: content
                        };

                        dataService.addPost(post)
                            .then(() => {
                                toastr.success('Post added successfully!');
                                document.location = '#/home';
                            });
                    });
                });
        }

        function logout() {
            dataService.logoutUser()
                .then(res => {
                    toastr.success('', 'Logout Success!');
                    document.location = '#/home';
                })
                .catch(() => {
                    toastr.error('Cannot logout right now!');
                });
        }

        return {
            home,
            login,
            logout,
            addPost
        };
    }

    return {
        get
    };
})();

export { controllers };