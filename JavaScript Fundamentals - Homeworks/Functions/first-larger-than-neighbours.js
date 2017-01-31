function Solve(args) {
    let sizeArr = +args[0],
        numbers = args[1].split(' ').map(Number);

    for (let i = 1; i < numbers.length - 1; i += 1) {
        if (IsLargerThanNeighbours(i, numbers)) {
            return i;
        }
    }

    return -1;

    function IsLargerThanNeighbours(index, numbers) {
        return +numbers[index] > +numbers[index - 1] && +numbers[index] > +numbers[index + 1];
    }
}