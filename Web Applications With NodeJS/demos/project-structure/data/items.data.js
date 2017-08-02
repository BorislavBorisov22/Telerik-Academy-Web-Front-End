const { BaseData } = require('./base/base.data');
const { Item } = require('../models/item.model');

class ItemsData extends BaseData {
    constructor(db) {
        super(db, Item, Item);
    }
}

module.exports = { ItemsData };
