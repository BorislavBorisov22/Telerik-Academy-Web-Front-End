document.getElementById("result").innerHTML = GetProperties(document) + GetProperties(window) + GetProperties(navigator);

function GetProperties(obj) {

    let min = 0;
    let max = 0;

    for (let property in obj) {
        if (!min) {
            min = property;
        }
        if (!max) {
            max = property;
        }

        if (property < min) {
            min = property;
        }
        if (property > max) {
            max = property;
        }
    }

    return `<h1> ${obj} </h1> <p> ${min} </p> <p> ${max} </p>`;
}