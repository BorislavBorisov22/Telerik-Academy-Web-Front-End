function Clone(obj) {
    if (obj === null || 'object' != typeof obj) {
        return obj;
    }

    var copy = obj.constructor();

    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) {
            copy[attr] = obj[attr];
        }
    }

    return copy;
}


console.log(Clone(5));
console.log(Clone({
    name: "Penka",
    age: 33
}));