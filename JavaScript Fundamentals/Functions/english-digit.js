function Solve(args) {
    let number = +args[0];

    GetLastDigitAsWord(number);

    function GetLastDigitAsWord(number) {
        let lastDigit = number % 10;
        let lestDigitAsWord = "";
        switch (lastDigit) {
            case 0:
                lastDigitAsWord = "zero";
                break;
            case 1:
                lastDigitAsWord = "one";
                break;
            case 2:
                lastDigitAsWord = "two";
                break;
            case 3:
                lastDigitAsWord = "three";
                break;
            case 4:
                lastDigitAsWord = "four";
                break;
            case 5:
                lastDigitAsWord = "five";
                break;
            case 6:
                lastDigitAsWord = "six";
                break;
            case 7:
                lastDigitAsWord = "seven";
                break;
            case 8:
                lastDigitAsWord = "eight";
                break;
            case 9:
                lastDigitAsWord = "nine";
                break;
        }

        console.log(lastDigitAsWord);
    }

}