function PointInACircle(args) {
    var circleRadius = 2;
    var pointX = +args[0];
    var pointY = +args[1];

    var isInside = false;

    var distance = Math.sqrt(pointX * pointX + pointY * pointY);

    if (distance <= circleRadius) {
        console.log("yes " + distance.toFixed(2));
    } else {
        console.log("no " + distance.toFixed(2));
    }
}

//var input = ['100', '-30'];
//PointInACircle(input);