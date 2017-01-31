function Solve(args) {
    var input = args[0],
        result = "",
        i;

    for (i = input.length - 1; i >= 0; i -= 1) {
        result += input[i];
    }

    console.log(result);
}