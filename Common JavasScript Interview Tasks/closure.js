// 1.closure
const printNumber = (number) => {
    return () => {
        console.log('index ' + number);
    };
};

for (var i = 0; i < 10; i += 1) {
    setTimeout(printNumber(i), 3000);
}
