/* globals $ */

/* 

Create a function that takes an id or DOM element and:
  

*/

function solve() {
    'use strict';

    return function(selector) {
        let targetElement;

        if (typeof selector === 'string') {
            targetElement = document.getElementById(selector);
        } else if (selector instanceof HTMLElement) {
            targetElement = selector;
        } else {
            throw Error('Provided parameter must be either a string selector or an html element itself!');
        }

        const buttonsAndContentArr = Array.from(document.querySelectorAll('.content, .button'));

        buttonsAndContentArr.forEach(el => {
            if (el.className === 'button') {
                el.innerHTML = 'hide';
            }
        });

        targetElement.addEventListener('click', function(event) {
            const clickedElement = event.target;

            if (clickedElement.className === 'button') {
                handleButtonClick(clickedElement);
            }
        });

        function handleButtonClick(clickedButton) {
            const clickedButtonIndex = buttonsAndContentArr.findIndex(x => x === clickedButton);

            let indexContent = -1;
            for (let i = clickedButtonIndex + 1; i < buttonsAndContentArr.length; i += 1) {
                if (buttonsAndContentArr[i].className === 'content') {
                    indexContent = i;
                    break;
                }
            }

            if (indexContent === -1) {
                return;
            }

            let indexNextButton = -1;
            for (let i = indexContent + 1; i < buttonsAndContentArr.length; i += 1) {
                if (buttonsAndContentArr[i].className === 'button') {
                    indexNextButton = i;
                    break;
                }
            }

            console.log(indexNextButton);
            if (indexNextButton === -1) {
                return;
            }

            const targetContent = buttonsAndContentArr[indexContent];

            if (targetContent.style.display === 'none') {
                targetContent.style.display = '';
                clickedButton.innerHTML = 'hide';
            } else {
                targetContent.style.display = 'none';
                clickedButton.innerHTML = 'show';
            }
        }
    };
}

module.exports = solve;