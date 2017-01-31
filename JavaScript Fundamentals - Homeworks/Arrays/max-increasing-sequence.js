function MaxIncreasingSeq(args) {
    let numbers = args;

    let maxSeqCount = 1;
    let currSeqCount = 1;
    for (let i = 0; i < numbers.length - 1; i += 1) {
        let currentNumber = +numbers[i];
        let nextNumber = +numbers[i + 1];

        if (currentNumber < nextNumber) {
            currSeqCount++;
            if (currSeqCount > maxSeqCount) {
                maxSeqCount = currSeqCount;
            }

        } else {
            if (currSeqCount > maxSeqCount) {
                maxSeqCount = currSeqCount;
            }
            currSeqCount = 1;
        }


    }

    return maxSeqCount;
}
