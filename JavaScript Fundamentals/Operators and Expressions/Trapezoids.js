function CalculateTrapezoidArea(args) {
    var sideA = +args[0];
    var sideB = +args[1];
    var height = +args[2];

    var trapezoidArea = (sideA + sideB) * height / 2;
    console.log(trapezoidArea.toFixed(7));
}

//var input = ['5', '7', '12'];
//CalculateTrapezoidArea(input);