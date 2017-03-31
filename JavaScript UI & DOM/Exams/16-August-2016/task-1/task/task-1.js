function solve() {
    'use strict';

    return function(selector, initialSuggestions) {
        var targetElement = document.querySelector(selector);

        var uniqueSuggestions = [];

        var suggestionsList = targetElement.getElementsByClassName('suggestions-list')[0],
            input = targetElement.getElementsByClassName('tb-pattern')[0],
            addButton = targetElement.getElementsByClassName('btn-add')[0];

        var liTemplate = document.createElement('li');
        liTemplate.className = 'suggestion';

        var anchorTagTemplate = document.createElement('a');
        anchorTagTemplate.className = 'suggestion-link';

        if (initialSuggestions) {
            initialSuggestions.forEach(function(suggestionName) {
                AddSuggestion(suggestionName);
            });
        }

        input.addEventListener('input', function(ev) {
            var inputValue = input.value;

            var links = [].slice.apply(suggestionsList.getElementsByClassName('suggestion-link'));

            links.forEach(function(link) {
                if (inputValue === '') {
                    link.parentElement.style.display = 'none';
                    return;
                }

                if (link.innerHTML.toLowerCase().includes(inputValue.toLowerCase())) {
                    link.parentElement.style.display = '';
                } else {
                    link.parentElement.style.display = 'none';
                }
            });
        });

        addButton.addEventListener('click', function() {
            var inputValue = input.value;

            if (inputValue === '') {
                return;
            }

            var isAdded = AddSuggestion(inputValue);
            if (isAdded) {
                input.value = '';
            }
        });

        suggestionsList.addEventListener('click', function(ev) {
            var inputValueToSet = '';

            var clickedElement = ev.target;

            if (clickedElement.tagName === 'LI') {
                inputValueToSet = clickedElement.firstElementChild.innerHTML;
            } else if (clickedElement.tagName === 'A') {
                inputValueToSet = clickedElement.innerHTML;
            }

            input.value = inputValueToSet;
        });

        function AddSuggestion(suggestionName) {
            if (uniqueSuggestions.indexOf(suggestionName.toLowerCase()) >= 0) {
                return false;
            }

            uniqueSuggestions.push(suggestionName.toLowerCase());

            var liToAdd = liTemplate.cloneNode(true);
            liToAdd.style.display = 'none';

            var linkToAdd = anchorTagTemplate.cloneNode(true);
            linkToAdd.innerHTML = suggestionName;

            liToAdd.appendChild(linkToAdd);

            suggestionsList.appendChild(liToAdd);

            return true;
        }
    };
}