/* globals $ */

/*
Create a function that takes a selector and:
* Finds all elements with class `button` or `content` within the provided element
  * Change the content of all `.button` elements with "hide"
* When a `.button` is clicked:
  * Find the topmost `.content` element, that is before another `.button` and:
    * If the `.content` is visible:
      * Hide the `.content`
      * Change the content of the `.button` to "show"       
    * If the `.content` is hidden:
      * Show the `.content`
      * Change the content of the `.button` to "hide"
    * If there isn't a `.content` element **after the clicked `.button`** and **before other `.button`**, do nothing
* Throws if:
  * The provided ID is not a **jQuery object** or a `string` 

*/
function solve() {
    return function(selector) {

        const $targetElement = validateInputParams(selector);

        const buttonsAndContentArr = Array.from($targetElement.find('.button, .content'));

        buttonsAndContentArr.forEach($element => {
            $element = $($element);

            if ($element.hasClass('button')) {
                $element.html('hide');
            }
        });

        $targetElement.on('click', '.button', function() {
            const $this = $(this);

            const $nextContent = $this.nextAll('.content').first();

            if ($nextContent.length === 0) {
                return;
            }

            const $nextButton = $nextContent.nextAll('.button');

            if ($nextButton.length === 0) {
                return;
            }

            toggleDisplay($nextContent, $this);
        });

        function toggleDisplay($content, $button) {
            if ($content.css('display') === 'none') {
                $content.css('display', '');
                $button.html('hide');
            } else {
                $content.css('display', 'none');
                $button.html('show');
            }
        }


        function validateInputParams(selector) {
            let $selectedElement;
            if (typeof selector === 'string') {
                $selectedElement = $(selector);
            } else if (selector instanceof jQuery) {
                $selectedElement = selector;
            } else {
                throw Error('Provided input parameter must be either a string seletor or a jQuery object itslef!');
            }

            if ($selectedElement.length === 0) {
                throw Error('Provided seletor does not select anything!');
            }

            return $selectedElement;
        }
    };
}

module.exports = solve;