function Solve(args) {
    let numbers = args[0].split(' ').map(Number),
        max = +numbers[0];


    for (let i = 0; i < numbers.length; i += 1) {
        max = GetMax(max, +numbers[i]);
    }

    console.log(max);

    function GetMax(first, second) {
        if (first > second) {
            return first;
        } else {
            return second;
        }
    }
}

//Solve(['8', '3', '6']);