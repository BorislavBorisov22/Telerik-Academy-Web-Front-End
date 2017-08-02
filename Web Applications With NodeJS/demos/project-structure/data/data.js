const { ItemsData } = require('./items.data');
const { UsersData } = require('./users.data');

const init = (db) => {
    return Promise.resolve({
        items: new ItemsData(db),
        users: new UsersData(db),
    });
};

module.exports = { init };
