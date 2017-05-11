'use strict';

import { requester } from 'requester';

const templateLoader = (function() {

    function load(templateName) {
        const url = `../templates/${templateName}.handlebars`;

        return requester.get(url)
            .then(source => {
                const template = Handlebars.compile(source);
                return template;
            });
    }

    return {
        load
    };
})();

export { templateLoader };