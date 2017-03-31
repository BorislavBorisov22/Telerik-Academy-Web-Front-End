function Solve(args) {
    // console.log(args);
    let text = args[0];

    text = text.replace(/a href="(.*?)">(.*?)<\/a>/, '[$2]($1)');
    console.log(text);
}