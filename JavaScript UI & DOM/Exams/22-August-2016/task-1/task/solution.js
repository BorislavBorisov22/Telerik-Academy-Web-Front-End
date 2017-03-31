function solve() {
    return function(selector, tabs) {
        var targetElement = document.querySelector(selector);

        var navigation = document.createElement('ul');
        navigation.className += ' tabs-nav';

        var content = document.createElement('ul');
        content.className += ' tabs-content';

        var fragment = document.createDocumentFragment();

        tabs.forEach(function(tab, index) {
            var contentClassName = ' tab-content';

            if (index === 0) {
                contentClassName += ' visible';
            }

            navigation.innerHTML += '<li><a href="#" class="tab-link" data-index="' + index + '">' + tab.title + '</a></li>';
            content.innerHTML += '<li class="' + contentClassName + '"><p>' + tab.content + '</p> <button class="btn-edit">Edit</button></li>';

        });

        var tabContents = [].slice.apply(content.getElementsByClassName('tab-content'));

        navigation.addEventListener('click', function(ev) {
            var clickedItem;

            if (ev.target.tagName === 'LI') {
                clickedItem = ev.target.firstChild;
            } else if (ev.target.tagName === 'A') {
                clickedItem = ev.target;
            }

            var dataIndex = +clickedItem.getAttribute('data-index');

            tabContents.forEach(function(element, index) {
                if (index !== dataIndex) {
                    element.className = 'tab-content';
                } else {
                    element.className = 'tab-content visible';
                    element.firstElementChild.innerHTML = tabs[index].content;
                }
            });
        });

        content.addEventListener('click', function(ev) {
            var clickedItem = ev.target;

            if (clickedItem.tagName !== 'BUTTON') {
                return;
            }

            var parent = clickedItem.parentElement;

            if (clickedItem.innerHTML === 'Edit') {
                clickedItem.innerHTML = 'Save';

                var area = document.createElement('textarea');
                area.className = 'edit-content';
                area.value = parent.firstElementChild.innerHTML;

                parent.appendChild(area);
            } else {
                clickedItem.innerHTML = 'Edit';

                parent.firstElementChild.innerHTML = parent.lastElementChild.value;
                parent.lastElementChild.remove();
            }
        });

        fragment.appendChild(navigation);
        fragment.appendChild(content);

        targetElement.appendChild(fragment);
    };
}

if (typeof module !== 'undefined') {
    module.exports = solve;
}