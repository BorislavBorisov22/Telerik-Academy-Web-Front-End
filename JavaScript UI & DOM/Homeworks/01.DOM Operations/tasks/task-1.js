/* globals $ */

/* 

Create a function that takes an id or DOM element and an array of contents

* if an id is provided, select the element
* Add divs to the element
  * Each div's content must be one of the items from the contents array
* The function must remove all previous content from the DOM element provided
* Throws if:
  * The provided first parameter is neither string or existing DOM element
  * The provided id does not select anything (there is no element that has such an id)
  * Any of the function params is missing
  * Any of the function params is not as described
  * Any of the contents is neight `string` or `number`
    * In that case, the content of the element **must not be** changed   
*/

module.exports = function() {

    return function(element, contents) {
        // validating input params
        if (!(element && contents)) {
            throw Error('missing html element or contents parameter!');
        }

        // validating the target html element
        let targetElement;
        if (typeof element === 'string') {
            targetElement = document.getElementById(element);
        } else if (element instanceof HTMLElement) {
            targetElement = element;
        } else {
            throw Error('Provided patameter must be either a string or an html element instance!');
        }

        if (targetElement === null) {
            throw Error('Element with such id does not exist!');
        }

        // validating contents
        contents.forEach(c => {
            if (typeof c !== 'string' && typeof c !== 'number') {
                throw Error('Each content must be of type string or number!');
            }
        });

        targetElement.innerHTML = '';
        const fragment = document.createDocumentFragment();

        const templateDiv = document.createElement('div');

        contents.forEach(content => {
            const divToAdd = templateDiv.cloneNode(true);
            divToAdd.innerHTML = content;

            fragment.appendChild(divToAdd);
        });

        targetElement.appendChild(fragment);
    };
};