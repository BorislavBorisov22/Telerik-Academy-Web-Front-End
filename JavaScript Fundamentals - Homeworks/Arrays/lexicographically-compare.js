function CompareLexicographically(args) {
    let firstString = args[0].toString(),
        secondString = args[1].toString();

    if (firstString > secondString) {
        return ">";
    } else if (firstString < secondString) {
        return "<";
    } else {
        return "=";
    }
}