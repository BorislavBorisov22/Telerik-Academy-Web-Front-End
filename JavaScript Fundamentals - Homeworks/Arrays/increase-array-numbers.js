function IncreaseArrayNumbers(args) {
    let endLoop = +args[0];
    let result = [0];
    for (let i = 0; i < endLoop; i += 1) {
        result[i] = i * 5;
    }

    for (let i = 0; i < result.length; i += 1) {
        console.log(result[i]);
    }
}

//IncreaseArrayNumbers(['15']);