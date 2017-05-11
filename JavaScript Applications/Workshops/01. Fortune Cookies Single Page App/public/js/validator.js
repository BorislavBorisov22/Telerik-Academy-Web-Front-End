const validator = (function() {
    'use strict';

    function isValidUserName(username) {
        if (username.length < 6 || username.length > 30 || !username.match(/^[0-9a-zA-Z_.]+$/)) {
            return false;
        }

        return true;
    }

    function isValidCookieText(cookieText) {
        if (cookieText.length < 6 || cookieText.length > 30 || !cookieText.match(/^[a-zA-Z]$/)) {
            return false;
        }

        return true;
    }

    function isValidCookieCategory(category) {
        if (cookieText.length < 6 || cookieText.length > 30 || !cookieText.match(/^[a-zA-Z]$/)) {
            return false;
        }

        return true;
    }


    return {
        isValidUserName,

    };
})();