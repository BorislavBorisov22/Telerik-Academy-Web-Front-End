const template = (function() {

    const handlebars = window.Handlebars || window.handlebars,
        Handlebars = window.Handlebars || window.handlebars;

    function get(templateName) {
        const url = `../templates/${templateName}.handlebars`;

        const promise = new Promise((resolve, reject) => {
            $.get(url, function(templateHTML) {
                const template = Handlebars.compile(templateHTML);
                resolve(template);
            });
        });

        return promise;
    }

    return {
        get
    };
})();