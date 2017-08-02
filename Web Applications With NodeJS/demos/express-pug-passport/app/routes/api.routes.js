const { Router } = require('express');

const items = [{
    id: 1,
    name: 'someName',
}];

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;

const attach = (app) => {
    const router = new Router();

    router.get('/', (req, res) => {
            let {
                q,
                page,
                size
            } = req.query;

            page = page || DEFAULT_PAGE_NUMBER;
            size = size || DEFAULT_PAGE_SIZE;

            let result = items;

            if (q) {
                q = q.toLowerCase();
                result = result.filter((item) => {
                    return item.name.toLowerCase().includes(q);
                });
            }

            result = result.slice((page - 1) * size, page * size);
            return res.send(result);
        })
        .get('/:id', (req, res) => {
            const id = parseInt(req.params.id);

            const item = items.find((i) => i.id === id);
            if (!item) {
                return res.status(404)
                    .send({
                        error: 'Not found!',
                    });
            }

            return res.send(item);
        })
        .post('/', (req, res) => {
            const item = req.body
            item.id = items.length + 1;

            items.push(item);

            res.status(201)
                .send('Created');
        });

    app.use('/api/items', router);
};

module.exports = attach;