function Solve(args) {
    let sizeArr = +args[0],
        numbers = args[1].split(' '),
        searchedNumber = +args[2];

    console.log(GetAppsCount(numbers, searchedNumber));

    function GetAppsCount(numbersArr, searched) {
        let appCount = 0;

        for (let i = 0; i < numbersArr.length; i += 1) {
            if (+numbers[i] == searched) {
                appCount += 1;
            }
        }

        return appCount;
    }
}