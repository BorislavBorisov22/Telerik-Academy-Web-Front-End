const { Router } = require('express');

const attachRoutes = (app, { postsData }) => {
    const router = new Router();

    router
        .get('/', (req, res) => {
            return res.send(postsData.getAll());
        })
        .get('/:id', (req, res) => {
            const id = req.params.id;
            const targetPost = postsData.findById(id);

            return res.send(targetPost);
        })
        .post('/', (req, res) => {
            const post = req.body;
            const resultPost = postsData.add(post);

            return res.status(201)
            .send(resultPost);
        });

        app.use('/api/posts', router);
};

module.exports = attachRoutes;
