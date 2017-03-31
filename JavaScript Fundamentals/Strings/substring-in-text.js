function Solve(args) {
    let searchedWord = args[0].toLowerCase(),
        text = args[1].toLowerCase();

    let wordsCount = FindWordOccurences(searchedWord, text);
    console.log(wordsCount);

    function FindWordOccurences(word, text) {
        let wordsCount = 0,
            indexWord = text.indexOf(word, 0);

        while (indexWord !== -1) {
            wordsCount += 1;
            indexWord = text.indexOf(word, indexWord + 1);
        }

        return wordsCount;
    }
}

//Solve(['in', 'in this secaniro wi inin for the win']);