function Solve(args) {
    var forRemoval = args[0],
        originalArr = args.slice(1, args.length);
    //console.log(typeof(numbers));

    Array.prototype.remove = function(removeElement) {
        var resultArr = [];

        for (var i = 0; i < this.length; i += 1) {
            if (this[i] !== removeElement) {
                resultArr.push(this[i]);
            }
        }

        return resultArr;
    };

    var result = originalArr.remove(forRemoval);

    console.log(result.join("\n"));
}

Solve(['1', '2', '3', '2', '1', '2', '3', '2']);