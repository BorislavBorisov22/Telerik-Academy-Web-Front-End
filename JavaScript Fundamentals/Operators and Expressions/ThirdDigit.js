function ThirdDigit(args) {
    var number = Math.floor(+args[0]);

    var counter = 0;
    var thirdDigit = 0;

    while (counter < 3) {
        thirdDigit = Math.floor(number % 10);
        number /= 10;
        counter += 1;
    }

    if (thirdDigit === 7) {
        console.log(true);
    } else {
        console.log(false + " " + thirdDigit);
    }
}


// var input = ['5'];
// ThirdDigit(input);