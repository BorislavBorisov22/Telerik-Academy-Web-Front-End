function solve() {
    return function(fileContentsByName) {
        'use strict';

        var $fileContent = $('.file-content'),
            $items = $('.file-explorer > .items'),
            $input = $('input[type="text"]'),
            $addButton = $('.add-btn');

        $('.file-explorer').on('click', function(ev) {
            var $clickedItem = $(ev.target),
                $parent = $clickedItem.parent();

            if ($parent.hasClass('dir-item')) {
                $parent.toggleClass('collapsed');
            } else if ($parent.hasClass('file-item')) {
                $fileContent.text(fileContentsByName[$clickedItem.html()] || '');
            }

            if ($clickedItem.hasClass('del-btn')) {
                $clickedItem.parent().remove();
            }

            if ($clickedItem.hasClass('add-btn')) {
                $addButton.removeClass('visible');
                $input.addClass('visible');
            }
        });

        $input.on('keydown', function(ev) {
            if (ev.keyCode !== 13) {
                return;
            }

            var inputValue = $input.val();

            if (inputValue === '') {
                return;
            }

            var pathArgs = inputValue.split('/'),
                fileName,
                dirName,
                fileToAdd;

            if (pathArgs.length === 2) {
                dirName = pathArgs[0];
                fileName = pathArgs[1];

                var $targetDir = getDirByName(dirName);

                if (!$targetDir) {
                    return;
                }

                fileToAdd = getFile(fileName);

                var $dirsItemsList = $targetDir.find('.items');
                fileToAdd.appendTo($dirsItemsList);

            } else if (pathArgs.length === 1) {
                fileName = pathArgs[0];

                fileToAdd = getFile(fileName);
                fileToAdd.appendTo($items);
            }

            $input.val('');

            $input.removeClass('visible');
            $addButton.addClass('visible');
        });

        function getDirByName(dirName) {
            var dirNameElements = $('.dir-item > .item-name');
            var targetDir;

            dirNameElements.each(function(_, element) {
                var $element = $(element);
                if ($element.html() === dirName) {
                    targetDir = $element.parent('.dir-item');
                    return;
                }
            });

            return targetDir;
        }

        function getFile(fileName) {
            var $fileItem = $('<li/>')
                .addClass('file-item item');

            var $itemName = $('<a/>')
                .addClass('item-name')
                .html(fileName)
                .appendTo($fileItem);

            var $delButton = $('<a/>')
                .addClass('del-btn')
                .appendTo($fileItem);

            return $fileItem;
        }
    };
}