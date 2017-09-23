const getLongestIncreasingSubsequence = (numbers) => {
    const results = Array.from({ length: numbers.length }).map(_ => 1);

    const length = numbers.length;
    for (let i = 1; i < length; i += 1) {
        for (let j = 0; j < i; j += 1) {
            if (numbers[j] < numbers[i]) {
                results[i] = Math.max(results[i], results[j] + 1);
            }
        }
    }

    console.log(results);
    return results.reduce((a, b) => Math.max(a, b), results[0]);
};

const lis = getLongestIncreasingSubsequence([3, 4, -1, 0, 6, 2, 3]);
console.log(lis);

// print result
