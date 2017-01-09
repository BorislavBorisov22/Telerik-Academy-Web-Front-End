function Solve(args) {
    let htmlText = args;

    let result = ExtractHTML(htmlText);

    return result;

    function ExtractHTML(text) {
        let insideTag = false,
            result = "";
        for (let i = 0; i < text.length; i += 1) {
            let currentLine = text[i].trim();
            for (let j = 0; j < currentLine.length; j += 1) {
                if (currentLine[j] === "<") {
                    insideTag = true;
                } else if (currentLine[j] === ">") {
                    insideTag = false;
                } else if (!insideTag) {
                    result += currentLine[j];
                }
            }
        }

        return result;
    }
}

// console.log(Solve([
//     '<html>',
//     '  <head>',
//     '    <title>Sample site</title>',
//     '  </head>',
//     '  <body>',
//     '    <div>text',
//     '      <div>more text</div>',
//     '      and more...',
//     '    </div>',
//     '    in body',
//     '  </body>',
//     '</html>'
// ]));