const templateLoader = (function() {
    'use strict';

    function load(templateName) {

        const promise = new Promise((resolve, reject) => {
            const url = `../templates/${templateName}.handlebars`;
            console.log(url);
            $.get(url, function(source) {
                const template = Handlebars.compile(source);
                resolve(template);
            });
        });

        return promise;
    }

    return {
        load
    };
})();