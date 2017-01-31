function Solve(args) {
    String.prototype.format = function(obj) {
        var result = this;
        for (var prop in obj) {
            result = result.replace(new RegExp("#{" + prop + "}", 'g'), obj[prop]);
        }

        return result;
    };

    console.log(args[1].format(JSON.parse(args[0])));
}

// Solve(
//     [
//         '{ "name": "John", age: 13 }',
//         'My name is #{name} and I am #{age}-years-old'
//     ]
// );