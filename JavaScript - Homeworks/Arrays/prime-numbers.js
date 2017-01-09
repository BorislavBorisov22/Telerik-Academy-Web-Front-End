function PrimeNumbers(args) {
    let n = +args[0],
        isPrime;

    for (let i = n; i >= 2; i -= 1) {
        isPrime = true;
        for (let j = 2; j <= Math.floor(Math.sqrt(i)); j += 1) {
            if (i % j === 0) {
                isPrime = false;
                break;
            }
        }

        if (isPrime) {
            console.log(i);
            break;
        }
    }


}