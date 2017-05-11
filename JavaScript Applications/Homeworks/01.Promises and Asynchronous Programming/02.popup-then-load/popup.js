(function() {
    'use strict';

    const TIME_BEFORE_REDIRECTING = 2000;

    const popupPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 3000);
    });

    function popupMessage() {
        const popupDiv = document.getElementById('popup');
        popupDiv.style.display = 'block';
    }

    function waitBeforeRedirecting(time) {
        return new Promise((resolve, reject) => {

            setTimeout(() => {
                resolve();
            }, time);
        });
    }

    function redirectToNewPage(pageLink) {
        window.location = pageLink;
    }

    popupPromise
        .then(() => popupMessage())
        .then(() => waitBeforeRedirecting(TIME_BEFORE_REDIRECTING))
        .then(() => redirectToNewPage("https://www.google.bg/?gws_rd=ssl"));
})();