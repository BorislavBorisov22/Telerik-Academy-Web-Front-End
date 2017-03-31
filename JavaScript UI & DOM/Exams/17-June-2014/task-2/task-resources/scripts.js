/* globals $ */
$.fn.gallery = function(cols) {
    const $this = $(this),
        columnsPerRow = cols || 4,
        $galleryList = $this.children('.gallery-list'),
        $selected = $this.children('.selected');

    const $imageContainers = $galleryList.children('.image-container');

    const images = Array.from($imageContainers.find('img'));

    $this.addClass('gallery');
    $this.show();
    $selected.hide();

    $imageContainers.each(function(index, imgCont) {
        const $imgCont = $(imgCont);
        if (index % columnsPerRow === 0) {
            $imgCont.addClass('clearfix');
        }
    });

    $('.gallery').on('click', function(ev) {
        const $clickedItem = $(ev.target);

        let $clickedImage;
        if (!$clickedItem.hasClass('image-container')) {
            $clickedImage = $clickedItem.children().first();
        } else if ($clickedItem.prop('tagName') !== 'IMG') {
            $clickedImage = $clickedItem;
        }

        const prevImage = getPrevImage($clickedImage);
        const currentImage = $clickedImage;
        const nextImage = getNextImage($clickedImage);

        $selected.show();
        $selected.find('#previous-image').attr('src', $(prevImage).attr('src'));
        $selected.find('#current-image').attr('src', $(currentImage).attr('src'));
        $selected.find('#next-image').attr('src', $(nextImage).attr('src'));

        $galleryList.addClass('.disabled-background').addClass('blurred');
    });

    $('.selected #current-image').on('click', function() {
        $galleryList.removeClass('.disabled-background').removeClass('blurred');
        $selected.hide();

        console.log('here');
    });

    function getNextImage(image) {
        const $image = $(image);

        const dataInfo = +($image.attr('data-info'));

        let nextImage;
        if (dataInfo >= images.length) {
            nextImage = images[0];
        } else {
            nextImage = image[dataInfo + 1];
        }
    }

    function getPrevImage(image) {
        const $image = $(image);

        const dataInfo = $image.attr('data-info');

        let prevImage;
        if (dataInfo === '0') {
            prevImage = images[images.length - 1];
        } else {
            prevImage = images[+dataInfo - 1];
        }
    }
    return $this;
};