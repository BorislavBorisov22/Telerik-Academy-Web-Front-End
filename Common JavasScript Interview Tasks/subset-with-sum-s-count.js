const findSubsetsWithSumCount = (numbers, targetSum) => {
    const sums = Array.from({ length: targetSum + 1 }).map(_ => 0);
    sums[0] = 1;

    numbers.forEach((n) => {
        for (let i = sums.length - 1; i >= 0; i -= 1) {
            if (sums[i] > 0 && i + n <= targetSum) {
                sums[i + n] = sums[i] + sums[i + n];
            }
        }
    });

    return sums[targetSum];
};

const result = findSubsetsWithSumCount([1, 2, 3, 1], 3);
console.log(result);
