/* Task Description */
/* 
	Write a function that sums an array of numbers:
		numbers must be always of type Number
		returns `null` if the array is empty
		throws Error if the parameter is not passed (undefined)
		throws if any of the elements is not convertible to Number	

*/

function solve() {
    return function sum(numbers) {
        if (numbers.length === 0) {
            return null;
        }

        if (numbers === undefined) {
            throw "Invalid number of parameters";
        }

        let sum = 0;

        for (let i = 0; i < numbers.length; i += 1) {
            let currentNumber = Number(numbers[i]);
            if (Number.isNaN(currentNumber)) {
                throw "Array contains invalid number";
            }

            sum += currentNumber;
        }

        return sum;
    }
}

module.exports = solve;