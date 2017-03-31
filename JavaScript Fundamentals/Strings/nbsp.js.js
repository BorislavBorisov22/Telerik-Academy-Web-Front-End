function Solve(args) {
    let text = args[0],
        result = "";

    for (let i = 0; i < text.length; i += 1) {
        if (text[i] === " ") {
            result += "&nbsp;";
        } else {
            result += text[i];
        }
    }

    return result;
}


console.log(Solve(['This text contains 4 spaces!!']));