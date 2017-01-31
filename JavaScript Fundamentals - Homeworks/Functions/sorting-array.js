function Solve(args) {
    let sizeArr = +args[0];
    let numbers = args[1].split(' ').map(Number);


    for (let i = 0; i < numbers.length; i += 1) {
        for (let j = i + 1; j < numbers.length; j += 1) {
            if (isFirstBigger(numbers[i], numbers[j])) {
                let temp = numbers[i];
                numbers[i] = numbers[j];
                numbers[j] = temp;
            }
        }
    }

    let result = "";
    for (let i = 0; i < numbers.length; i += 1) {
        result += numbers[i];
        if (i !== numbers.length - 1) {
            result += " ";
        }
    }

    return result;

    function isFirstBigger(firstNumber, secondNumber) {
        return firstNumber > secondNumber;
    }
}