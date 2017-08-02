const { Router } = require('express');

const attachRouter = (app, { postsData }) => {
    const router = new Router();

    router.get('/', (req, res) => {
            const posts = postsData.getAll();

            return res.status(200)
                .render('posts/all', {
                    model: posts,
                });
        }).get('/add', (req, res) => {
            return res.status(200)
                .render('posts/add');
        })
        .get('/:id', (req, res) => {
            const id = req.params.id;
            const targetPost = postsData.findById(id);

            if (!targetPost) {
                return res.status(404)
                .redirect('/404');
            }

            return res.render('posts/details', {
                model: targetPost,
            });
        })
        .post('/', (req, res) => {
            const post = req.body;
            postsData.add(post);
            return res.status(201)
                .redirect('/posts');
        });

    app.use('/posts', router);
};

module.exports = attachRouter;
