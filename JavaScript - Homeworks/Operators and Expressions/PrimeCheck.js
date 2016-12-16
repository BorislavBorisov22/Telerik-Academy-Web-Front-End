function CheckIfPrime(args) {
    var number = Math.floor(+args[0]);

    var isPrime = true;

    for (var i = 2; i <= Math.sqrt(number); i += 1) {
        if (number % i === 0) {
            isPrime = false;
        }
    }

    if (number <= 1) {
        isPrime = false;
    }

    console.log(isPrime);
}


//var input = ['1'];
//CheckIfPrime(input);