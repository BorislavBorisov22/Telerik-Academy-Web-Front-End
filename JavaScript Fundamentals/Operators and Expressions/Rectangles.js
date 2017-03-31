function Solve(args) {
    var width = +args[0];
    var height = +args[1];

    var perimeter = width * 2 + height * 2;
    var area = width * height;
    console.log(area.toFixed(2) + " " + perimeter.toFixed(2));
}

//var input = ['5', '5'];
//Solve(input);