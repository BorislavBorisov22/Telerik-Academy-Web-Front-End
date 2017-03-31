function solve() {
    return function() {
        $.fn.listview = function(data) {
            const $this = $(this);

            const sourceId = $this.attr('data-template'),
                source = $('#' + sourceId).html();

            const template = handlebars.compile(source);

            data.forEach(function(book) {
                $this.html($this.html() + template(book));
            });

            return $this;
        };
    };
}

module.exports = solve;