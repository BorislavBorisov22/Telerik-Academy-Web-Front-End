const { Router } = require('express');

const items = [{
    name: "ivancho",
    id: 1
}, {
    name: "mariika",
    id: 2
}, {
    name: "Dragoi",
    id: 3
}]

const attach = (app) => {
    const router = new Router();

    router.get('/', (req, res) => {
            res.render('items/items', {
                model: items
            });
        })
        .get('/form', (req, res) => {
            return res.render('items/form');
        })
        .get('/:id', (req, res) => {
            const id = parseInt(req.params.id);
            const targetItem = items.find((i) => i.id === id);

            if (!targetItem) {
                return res.redirect('/404')
            }

            return res.render('details', {
                model: targetItem
            });
        })
        .post('/', (req, res) => {
            const item = req.body;
            item.id = items.length + 1;
            items.push(item);

            return res.redirect('/');
        });

    app.use('/items', router);
};

module.exports = attach;