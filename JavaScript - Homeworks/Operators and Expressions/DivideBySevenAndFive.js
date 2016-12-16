function Solve(args) {
    var number = +args[0];
    var output = number % 5 === 0 && number % 7 === 0 ? "true " + number : "false " + number;
    console.log(output);
}

//let input = [35];
//Solve(input);