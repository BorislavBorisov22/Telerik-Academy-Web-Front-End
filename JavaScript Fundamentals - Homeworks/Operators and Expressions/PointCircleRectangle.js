function IsInsideFigures(args) {
    var radiusCircle = 1.5;
    var pointX = +args[0];
    var pointY = +args[1];

    var isInsideCircle = (pointX - 1) * (pointX - 1) + (pointY - 1) * (pointY - 1) <= radiusCircle * radiusCircle;
    var isInsideRectangle = pointX >= -1 && pointX <= 5 && pointY <= 1 && pointY >= -1;

    var output;

    if (isInsideCircle) {
        output = "inside circle";
    } else {
        output = "outside circle";
    }

    if (isInsideRectangle) {
        output += " inside rectangle";
    } else {
        output += " outside rectangle";
    }
    console.log(output);
}


//var input = ['2.5', '1'];
//IsInsideFigures(input);