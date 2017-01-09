function ExtractEmails(args) {
    let text = args;

    //let emailPattern = new RegExp("[a-zA-z0-9_.]+@\[a-zA-Z0-9]+\.\w+");
    let matches = text.match(/[a-zA-Z0-9-_.]+@[a-zA-Z0-9]+\.[a-zA-Z0-9._-]+/gi);
    return matches;

}


let input = 'gogo@gmail.com is a nice mail and bobidjei@abv.bg also is nice';
console.log(ExtractEmails(input));
console.log(extractEmails(input));