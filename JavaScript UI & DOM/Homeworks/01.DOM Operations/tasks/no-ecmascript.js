function solve() {

    return function(element, contents) {
        var targetElement,
            fragment = document.createDocumentFragment();

        if (typeof element === 'string') {
            targetElement = document.getElementById(element);
        } else if (element instanceof HTMLElement) {
            targetElement = element;
        } else {
            throw Error('Provided element must be either a string representing id or an html element itself!');
        }

        if (targetElement === null) {
            throw Error('Provided selector does not select anythig!');
        }

        contents.forEach(function(content) {
            if (typeof content !== 'string' && typeof content !== 'number') {
                throw Error('every content item must be either of type string or number');
            }
        });

        targetElement.innerHTML = '';

        var templateDiv = document.createElement('div');

        contents.forEach(function(content) {
            var currentDiv = templateDiv.cloneNode(true);
            currentDiv.innerHTML = content;

            targetElement.appendChild(currentDiv);
        });
    };
}

module.exports = solve;