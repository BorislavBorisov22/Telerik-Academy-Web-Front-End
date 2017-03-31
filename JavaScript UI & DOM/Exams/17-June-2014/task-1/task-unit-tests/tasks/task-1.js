/* globals module */
function solve() {

    function clear(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

    return function(selector, items) {
        const root = document.querySelector(selector),
            fragment = document.createDocumentFragment();

        const rightSection = document.createElement('div'),
            leftSection = document.createElement('div'),
            filterHeader = document.createElement('span'),
            filterInput = document.createElement('input'),
            imagesList = document.createElement('ul');

        filterHeader.style.display = 'block';

        imagesList.className = 'images-list';
        imagesList.style.listStyleType = 'none';
        imagesList.style.position = 'relative';
        imagesList.style.marginTop = '1px';
        //imagesList.style.right = '0px';
        imagesList.style.padding = '1px';
        leftSection.className = 'image-preview';


        filterHeader.innerHTML = 'Filter';
        rightSection.appendChild(filterHeader);
        rightSection.appendChild(filterInput);
        rightSection.appendChild(imagesList);

        const liTemplate = document.createElement('li'),
            imgTemplate = document.createElement('img'),
            imageHeaderTemplate = document.createElement('h3');

        imageHeaderTemplate.style.padding = '0px';
        imageHeaderTemplate.style.margin = '0px';

        imgTemplate.width = 150;
        imgTemplate.height = 100;
        imgTemplate.style.borderRadius = "10px";
        imgTemplate.style.marginTop = '0px';

        liTemplate.style.margin = '0px';
        liTemplate.style.padding = '0px';
        liTemplate.style.borderRadius = '5px';
        liTemplate.className = 'image-container';
        liTemplate.appendChild(imageHeaderTemplate);
        liTemplate.appendChild(imgTemplate);

        const leftSectionHeader = document.createElement('h1'),
            leftSectionImage = imgTemplate.cloneNode(true);

        leftSectionImage.width = 330;
        leftSectionImage.height = 260;
        leftSection.appendChild(leftSectionHeader);
        leftSection.appendChild(leftSectionImage);

        setDisplayToInlineBlock(leftSection);
        setDisplayToInlineBlock(rightSection);

        leftSection.style.padding = '10px';
        leftSection.style.textAlign = 'center';
        leftSection.style.width = "370px";
        leftSection.style.height = "350px";

        rightSection.style.textAlign = 'center';
        rightSection.style.position = 'absolute';
        rightSection.style.padding = '10px';
        rightSection.style.left = '400px';
        rightSection.style.overflowY = 'scroll';
        rightSection.style.height = '350px';

        createImagePreview();

        rightSection.addEventListener('mouseover', function(ev) {
            if (ev.target.className === 'image-container') {
                ev.target.style.backgroundColor = 'grey';
            } else if (ev.target.tagName === 'IMG' || ev.target.tagName === 'H3') {
                console.log('here');
                ev.target.parentElement.style.backgroundColor = 'grey';
            }
        });

        filterInput.addEventListener('input', function() {
            const inputValue = filterInput.value.toLowerCase();

            const lis = Array.from(imagesList.getElementsByClassName('image-container'));

            lis.forEach(function(li) {
                if (li.firstElementChild.innerHTML.toLowerCase().includes(inputValue)) {
                    li.style.display = '';
                } else {
                    li.style.display = 'none';
                }
            });
        });

        imagesList.addEventListener('click', function(ev) {
            let clickedLi;
            if (ev.target.tagName === 'LI') {
                clickedLi = ev.target;
            } else if (ev.target.tagName === 'H3' || ev.target.tagName === 'IMG') {
                clickedLi = ev.target.parentElement;
            }

            leftSectionHeader.innerHTML = clickedLi.firstElementChild.innerHTML;
            leftSectionImage.src = clickedLi.lastElementChild.src;
        }, true);

        fragment.appendChild(leftSection);
        fragment.appendChild(rightSection);
        root.appendChild(fragment);

        function createImagePreview() {

            items.forEach(function(item, index) {
                if (index === 0) {
                    leftSectionHeader.innerHTML = item.title;
                    leftSectionImage.src = item.url;
                }

                const currentLi = liTemplate.cloneNode(true);

                currentLi.addEventListener('mouseleave', function() {
                    this.style.backgroundColor = 'white';
                });

                currentLi.firstElementChild.innerHTML = item.title;
                currentLi.lastElementChild.src = item.url;

                imagesList.appendChild(currentLi);
            });
        }

        function setDisplayToInlineBlock(item) {
            item.style.display = 'inline-block';
        }
    };
}

module.exports = solve;