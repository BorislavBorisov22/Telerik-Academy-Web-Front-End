function GetSumSeq(args) {
    let numbers = args;
    for (let i = 0; i < args.length; i += 1) {
        numbers[i] = +numbers[i];
        //console.log(typeof(numbers[i]) + " " + numbers[i]);
    }

    let maxEquals = 1;
    let currentEquals = 1;

    for (let i = 0; i < numbers.length - 1; i++) {

        if (numbers[i] === numbers[i + 1]) {
            currentEquals++;
            if (currentEquals > maxEquals) {
                maxEquals = currentEquals;
            }
        } else {
            if (currentEquals > maxEquals) {
                maxEquals = currentEquals;
            }
            currentEquals = 1;
        }
    }

    return maxEquals;
}

// let input = ['10', '2', '1', '1', '2', '3', '3', '2', '2', '2', '1'];
// let result = GetSumSeq(input);

// console.log(result);