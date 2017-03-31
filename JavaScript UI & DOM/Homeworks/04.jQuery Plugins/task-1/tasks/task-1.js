function solve() {
    return function(selector) {
        'use strict';

        const $targetElement = $(selector).css('display', 'none');

        const $dropdownList = $('<div />').addClass('dropdown-list');
        $dropdownList.append($targetElement);

        const $optionsContainer = $('<div />').addClass('options-container');
        $optionsContainer.css({
            'display': 'none',
            'position': 'absolute'
        });

        const options = Array.from($targetElement.find('option'));
        options.forEach(function(option, index) {
            const $currentOption = $(option);

            const $optionToAdd = $('<div />').addClass('dropdown-item');
            $optionToAdd.attr({
                'data-value': $currentOption.val(),
                'data-index': index
            });

            $optionToAdd.html($currentOption.html());
            $optionToAdd.appendTo($optionsContainer);
        });

        const $current = $('<div />').addClass('current');
        $current.html('Select a value');

        $current.on('click', function() {
            const $this = $(this);
            $this.html('Select a value');

            if ($optionsContainer.css('display') === 'none') {
                $optionsContainer.css('display', '');
            } else {
                $optionsContainer.css('display', '');
            }
        });

        $optionsContainer.on('click', '.dropdown-item', function() {
            const $this = $(this);

            $current.html($this.html());
            $optionsContainer.css('display', 'none');
            $current.attr({
                'value': $this.attr('data-value')
            });

            $targetElement.val($this.attr('data-value'));
        });

        $dropdownList.append($current);
        $dropdownList.append($optionsContainer);

        $('body')
            // .remove(selector)
            .append($dropdownList);
    };
}

module.exports = solve;