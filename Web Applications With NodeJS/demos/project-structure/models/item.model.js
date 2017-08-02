class Item {
    static isModelValid(model) {
        return typeof model !== 'undefined' &&
            typeof model.text === 'string' &&
            model.text.length > 3;
    }

    static toViewModel(model) {
        const viewModel = new Item();
        Object.keys(model).forEach((k) => {
            viewModel[k] = model[k];
        });

        return viewModel;
    }

    static fromViewModel(model) {

    }

    get id() {
        return this._id;
    }
}

module.exports = { Item };
