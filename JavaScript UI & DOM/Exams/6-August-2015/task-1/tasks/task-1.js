function solve() {
    return function(selector, isCaseSensitive) {
        // isCaseSensitive = !!isCaseSensitive;
        var targetElement = document.querySelector(selector);
        targetElement.className = 'items-control';

        var fragment = document.createDocumentFragment();

        var addControls = document.createElement('div');
        addControls.className = 'add-controls';

        var addLabel = document.createElement('label');
        addLabel.innerHTML = 'Enter text';
        var addInput = document.createElement('input');
        addLabel.appendChild(addInput);

        var addButton = document.createElement('button');
        addButton.innerHTML = 'Add';
        addButton.className = 'button';

        addControls.appendChild(addLabel);
        addControls.appendChild(addButton);
        fragment.appendChild(addControls);

        var searchControls = document.createElement('div');
        searchControls.className = 'search-controls';

        var searchLabel = document.createElement('label');
        searchLabel.innerHTML = 'Search:';
        var searchInput = document.createElement('input');
        searchLabel.appendChild(searchInput);

        searchControls.appendChild(searchLabel);
        fragment.appendChild(searchControls);

        var resultControls = document.createElement('div');
        resultControls.className = 'result-controls';

        var itemsList = document.createElement('ul');
        itemsList.className = 'items-list';

        resultControls.appendChild(itemsList);
        fragment.appendChild(resultControls);

        var liTemplate = document.createElement('li');
        liTemplate.className = 'list-item';
        var removeButtonTemplate = document.createElement('button');
        removeButtonTemplate.className = 'button';
        removeButtonTemplate.innerHTML = 'X';
        liTemplate.appendChild(removeButtonTemplate);

        addButton.addEventListener('click', function() {
            var inputValue = addInput.value;

            if (inputValue === '') {
                return;
            }

            var currentLi = liTemplate.cloneNode(true);
            var strong = document.createElement('strong');

            strong.innerHTML = inputValue;
            currentLi.appendChild(strong);

            itemsList.appendChild(currentLi);
        });

        searchInput.addEventListener('input', function(ev) {
            var inputValue = this.value;

            var lis = [].slice.apply(itemsList.getElementsByTagName('li'));

            if (!isCaseSensitive) {
                inputValue = inputValue.toLowerCase();
            }

            lis.forEach(function(li) {
                var liHTML = li.lastElementChild.innerHTML;

                if (!isCaseSensitive) {
                    liHTML = liHTML.toLowerCase();
                }

                if (liHTML.includes(inputValue)) {
                    li.style.display = '';
                } else {
                    li.style.display = 'none';
                }
            });
        });

        itemsList.addEventListener('click', function(ev) {
            var clickedItem = ev.target;

            if (clickedItem.className === 'button') {
                // clickedItem.parentElement.remove();
                this.removeChild(clickedItem.parentElement);
            }
        });

        targetElement.appendChild(fragment);
    };
}

module.exports = solve;