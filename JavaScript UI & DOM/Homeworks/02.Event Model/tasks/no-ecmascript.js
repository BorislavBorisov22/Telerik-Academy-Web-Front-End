/* globals $ */

/* 

Create a function that takes an id or DOM element and:
  

*/

function solve() {
    'use strict';

    return function(selector) {
        var targetElement = validateInputParameteres(selector);

        var buttonsAndContents = [].slice.apply(targetElement.querySelectorAll('.button, .content'));

        buttonsAndContents.forEach(function(element) {
            if (element.className === 'button') {
                element.innerHTML = 'hide';
            }
        });

        targetElement.addEventListener('click', function(ev) {
            if (ev.target.className === 'button') {
                handeButtonClick(ev.target);
            }
        });

        function handeButtonClick(clickedButton) {
            var i,
                len = buttonsAndContents.length,
                indexClickedButton,
                indexTargetContent = -1,
                targetContent,
                indexNextButton = -1;

            for (i = 0; i < len; i += 1) {
                if (buttonsAndContents[i] === clickedButton) {
                    indexClickedButton = i;
                    break;
                }
            }

            for (i = indexClickedButton + 1; i < len; i += 1) {
                if (buttonsAndContents[i].className === 'content') {
                    indexTargetContent = i;
                    targetContent = buttonsAndContents[i];
                    break;
                }
            }

            if (indexTargetContent === -1) {
                return;
            }

            for (i = indexTargetContent + 1; i < len; i += 1) {
                if (buttonsAndContents[i].className === 'button') {
                    indexNextButton = i;
                    break;
                }
            }

            if (indexNextButton === -1) {
                return;
            }

            toggleDisplay(clickedButton, targetContent);
        }

        function toggleDisplay(clickedButton, targetContent) {
            if (targetContent.style.display === 'none') {
                targetContent.style.display = '';
                clickedButton.innerHTML = 'hide';
            } else {
                targetContent.style.display = 'none';
                clickedButton.innerHTML = 'show';
            }
        }


        function validateInputParameteres(input) {
            var resultElement;
            if (typeof input !== 'string' && !(input instanceof HTMLElement)) {
                throw Error('Provided selector must be either a string or a DOM element!');
            }

            resultElement = document.getElementById(input);
            if (resultElement === null) {
                throw Error('Provided id selects nothing!');
            }

            return resultElement;
        }
    };
}

module.exports = solve;