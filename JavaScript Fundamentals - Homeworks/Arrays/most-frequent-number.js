function GetMostFrqeuent(args) {
    let numbers = args.map(Number),
        maxFrequency = 1,
        mostFrequent,
        currentFrequency;


    for (let i = 0; i < numbers.length - 1; i += 1) {
        currentFrequency = 0;
        let currentNumber = numbers[i];

        for (let j = 0; j < numbers.length; j += 1) {
            if (numbers[j] === currentNumber) {
                currentFrequency++;
            }
        }

        if (currentFrequency > maxFrequency) {
            maxFrequency = currentFrequency;
            mostFrequent = numbers[i];
        }
    }

    console.log(`${mostFrequent} (${maxFrequency} times)`);
}