/* Task description */
/*
	Write a function that finds all the prime numbers in a range
		1) it should return the prime numbers in an array
		2) it must throw an Error if any on the range params is not convertible to `Number`
		3) it must throw an Error if any of the range params is missing
*/

function solve() {
    return function findPrimes(start, end) {
        if (start === undefined || end === undefined) {
            throw "start and end of interval cannot be undefined";
        }

        if (Number.isNaN(Number(start) || Number.isNaN(Number(end)))) {
            throw "start and end parameters must be valid numbers";
        }

        let result = [];

        for (let i = +start; i <= +end; i += 1) {
            if (IsPrime(i)) {
                result.push(i);
            }
        }


        return result;

        function IsPrime(number) {
            if (number < 2) {
                return false;
            }
            if (number === 2) {
                return true;
            }

            for (let i = 2; i <= Math.sqrt(number); i += 1) {
                if (number % i === 0) {
                    return false;
                }
            }

            return true;
        }
    };
}

module.exports = solve;