/* globals $ */

/* 

Create a function that takes a selector and COUNT, then generates inside a $ul with COUNT $lis:   
  * The $ul must have a class `items-$list`
  * Each of the $lis must:
    * have a class `$list-item`
    * content "$list item #INDEX"
      * The indices are zero-based
  * If the provided selector does not selects anything, do nothing
  * Throws if
    * COUNT is a `Number`, but is less than 1
    * COUNT is **missing**, or **not convertible** to `Number`
      * _Example:_
        * Va$lid COUNT values:
          * 1, 2, 3, '1', '4', '1123'
        * Inva$lid COUNT values:
          * '123px' 'John', {}, [] 
*/

function solve() {
    return function(selector, count) {
        validateInputParams(selector, count);

        const $targetElement = $(selector);
        count = Number(count);

        if ($targetElement.length === 0) {
            return;
        }

        const $ul = $('<ul />').addClass('items-list');

        const $templateLi = $('<li />').addClass('list-item');

        let $currentLi;
        for (let i = 0; i < count; i += 1) {
            $currentLi = $templateLi.clone();
            $currentLi.html(`List item #${i}`);

            $ul.append($currentLi);
        }

        $targetElement.append($ul);

        function validateInputParams(selector, count) {
            if (typeof selector !== 'string') {
                throw Error('Selector must be of type string');
            }

            const countAsNumber = Number(count);

            if (Number.isNaN(countAsNumber)) {
                throw Error('Count must be valid number or convertible to number!');
            }

            if (countAsNumber <= 0) {
                throw Error('Count must be a positive number!');
            }
        }
    };
}

module.exports = solve;