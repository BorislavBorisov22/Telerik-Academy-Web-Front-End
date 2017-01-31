function Solve(args) {
    let text = args[0];

    let palindromes = FindPalindromes(text);
    return palindromes.join(", ");

    function FindPalindromes(text) {
        let palindromes = [];
        let currentWord = "";

        for (let i = 0; i < text.length; i += 1) {
            if (text[i].match(/[a-zA-z]/)) {
                currentWord += text[i];
            } else {
                if (IsPalindrome(currentWord)) {
                    palindromes.push(currentWord);
                }

                currentWord = "";
            }
        }

        return palindromes;
    }

    function IsPalindrome(word) {

        if (word === "") {
            return false;
        }

        for (let i = 0; i < word.length / 2; i += 1) {
            if (word[i] !== word[word.length - 1 - i]) {
                return false;
            }
        }

        return true;
    }
}


let input = ['duud and some other text abba, gooog notapalindrome'];
let result = Solve(input);
console.log(result);