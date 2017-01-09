function Solve(args) {
    let expression = args[0];


    if (AreBracketsCorrect(expression)) {
        console.log("Correct");
    } else {
        console.log("Incorrect");
    }

    function AreBracketsCorrect(expression) {
        let storeBrackets = [];

        for (let i = 0; i < expression.length; i += 1) {
            if (expression[i] === "(") {
                storeBrackets.push(expression[i]);
            } else if (expression[i] === ")") {
                if (storeBrackets.pop() !== "(") {
                    return false;
                }
            }
        }

        if (storeBrackets.length !== 0) {
            return false;
        }

        return true;
    }
}

//Solve(['((a+b)/5-d)']);