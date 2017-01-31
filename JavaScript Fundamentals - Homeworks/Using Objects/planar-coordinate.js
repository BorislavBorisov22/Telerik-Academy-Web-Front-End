function Solve(args) {
    //var coordinateValues = args.map(Number);
    var firstPoint = MakePoint(+args[0], +args[1]), //(coordinateValues[0], coordinateValues[1]),
        secondPoint = MakePoint(+args[2], +args[3]), //(coordinateValues[2], coordinateValues[3]),
        thirdPoint = MakePoint(+args[4], +args[5]), //(coordinateValues[4], coordinateValues[5]),
        fourhtPoint = MakePoint(+args[6], +args[7]), //(coordinateValues[6], coordinateValues[7]),
        fifthPoint = MakePoint(+args[8], +args[9]), //(coordinateValues[8], coordinateValues[9]),
        sixthPoint = MakePoint(+args[10], +args[11]); //(coordinateValues[10], coordinateValues[11]);


    var firstLine = MakeLine(firstPoint, secondPoint),
        secondLine = MakeLine(thirdPoint, fourhtPoint),
        thirdLine = MakeLine(fifthPoint, sixthPoint);

    CalculateDistance(firstLine);
    CalculateDistance(secondLine);
    CalculateDistance(thirdLine);

    console.log(firstLine.totalLength.toFixed(2));
    console.log(secondLine.totalLength.toFixed(2));
    console.log(thirdLine.totalLength.toFixed(2));

    if (TriangleExists(firstLine, secondLine, thirdLine)) {
        console.log("Triangle can be built");
    } else {
        console.log("Triangle can not be built");
    }

    function MakePoint(x, y) {
        var point = { x: x, y: y };
        return point;
    }

    function MakeLine(firstPoint, secondPoint) {
        var line = { firstPoint: firstPoint, secondPoint: secondPoint };
        return line;
    }

    function CalculateDistance(line) {
        var xDifference = Math.abs(line.firstPoint.x - line.secondPoint.x),
            yDifference = Math.abs(line.firstPoint.y - line.secondPoint.y),
            lineLength = Math.sqrt(xDifference * xDifference + yDifference * yDifference);

        line.totalLength = lineLength;
    }

    function TriangleExists(firstLine, secondLine, thirdLine) {
        var exists = firstLine.totalLength + secondLine.totalLength >= thirdLine.totalLength &&
            firstLine.totalLength + thirdLine.totalLength >= secondLine.totalLength &&
            secondLine.totalLength + thirdLine.totalLength >= firstLine.totalLength;

        return exists;
    }
}

Solve([
    '7', '7', '2', '2',
    '5', '6', '2', '2',
    '95', '-14.5', '0', '-0.123'
]);