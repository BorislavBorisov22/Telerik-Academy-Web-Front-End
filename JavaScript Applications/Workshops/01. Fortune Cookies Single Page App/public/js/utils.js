const utils = (function() {
    'use strict';

    function popupMessage(message, color) {

        const data = {
            message: message,
            color: color
        };
        console.log(data);

        const promise = new Promise((resolve, reject) => {
            resolve(templateLoader.load('login-reg-success'));
        });

        promise.then((template) => {
            $('body').append(template(data));

            $('#login-reg-success').fadeOut(4000, function() {
                $(this).remove();
            });
        });

        return promise;
    }

    function updateRatings(rateContainer) {
        const promise = new Promise((resolve, reject) => {
            const $rateContainer = $(rateContainer);
            const currentRating = Number($rateContainer.html());

            const newRating = currentRating + 1;
            $rateContainer.html(newRating);
        });

        return promise;
    }

    return {
        popupMessage: popupMessage,
        udpateRatings: updateRatings
    };
})();