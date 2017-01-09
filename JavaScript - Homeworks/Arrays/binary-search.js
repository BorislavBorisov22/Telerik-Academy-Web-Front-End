function BinarySearch(args) {
    let sizeArray = +args[0],
        numbers = args.slice(1, args.length - 1).map(Number),
        searchedNumber = +args[args.length - 1],
        startIndex = Math.floor(0),
        endIndex = numbers.length - 1,
        resultIndex = -1;



    while (true) {
        if (startIndex > endIndex) {
            break;
        }

        let middleIndex = ((startIndex + endIndex) / 2) | 0;
        if (numbers[middleIndex] === searchedNumber) {
            resultIndex = middleIndex;
            break;
        } else if (numbers[middleIndex] < searchedNumber) {
            startIndex = middleIndex + 1;
        } else {
            endIndex = middleIndex - 1;
        }
    }

    console.log(resultIndex);

}

//let input = ['10', '1', '2', '4', '8', '16', '31', '32', '64', '77', '99', '32'];
//BinarySearch(input);