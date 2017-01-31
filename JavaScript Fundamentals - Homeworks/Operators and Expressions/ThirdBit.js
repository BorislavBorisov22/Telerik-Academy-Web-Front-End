function GetThirdBit(args) {
    var number = +args[0];
    var position = 3;
    var thirdBit = number >> position & 1;
    console.log(thirdBit);
}