function SelectionSort(args) {
    let numbersCount = +args[0],
        numbers = args.slice(1, args.length).map(Number);

    for (let i = 0; i < numbers.length; i += 1) {
        for (let j = i + 1; j < numbers.length; j++) {
            if (numbers[j] < numbers[i]) {
                let temp = numbers[i];
                numbers[i] = numbers[j];
                numbers[j] = temp;
            }
        }
    }

    for (let num in numbers) {
        console.log(numbers[num]);
    }
}