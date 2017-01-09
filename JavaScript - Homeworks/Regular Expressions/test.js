function Solve(args) {
    var obj = JSON.parse(args[0]),
        htmlText = args[1];


    String.prototype.bind = function(obj) {
        var htmlText = this;
        var regex = /data-bind-(.*?)="(.*?)"/gi;

        var currentMatch = regex.exec(htmlText);

        while (currentMatch !== null) {

            var index = htmlText.indexOf(">");
            if (htmlText.indexOf("/>") !== -1) {
                index -= 1;
            }

            var propertyName = currentMatch[1];

            var arr = htmlText.split('');
            if (propertyName === "content") {
                arr.splice(index + 1, 0, obj[currentMatch[2]]);
                htmlText = arr.join("");
            } else {
                arr.splice(index, 0, " " + propertyName + '="' + obj[currentMatch[2]] + '"');
                htmlText = arr.join("");
            }

            currentMatch = regex.exec(htmlText);
        }

        return htmlText;
    };

    htmlText = htmlText.bind(obj);
    console.log(htmlText);
}