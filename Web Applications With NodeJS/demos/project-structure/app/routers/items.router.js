const attachTo = (app, data) => {
    app.get('/items', (req, res) => {
        return data.items.getAll()
            .then((items) => {
                return res.render('items/all', {
                    context: items,
                });
            });
    });

    app.get('/items/form', (req, res) => {
        return res.render('items/form');
    });

    app.post('/items', (req, res) => {
        const item = req.body;

        data.items.create(item)
            .then((dbItem) => {
                res.redirect('/items/' + dbItem.id);
            });
    });
};

module.exports = { attachTo };
