String.prototype.repeatify = String.prototype.repeatify || function (times) {
    if (Number.isNaN(+times)) {
        throw new Error('times must be a valid number');
    }

    let result = '';
    for (let i = 0; i < times; i += 1) {
        result += this;
    }

    return result;
};

const str = 'someString';

const reapeated = str.repeatify(2);
console.log(reapeated);
