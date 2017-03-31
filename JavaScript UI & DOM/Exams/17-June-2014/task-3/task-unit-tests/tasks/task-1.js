/* globals module */
function solve() {
    return function(selector) {
        $(selector).html(`{{#authors}}
        <div {{#if right}}class="box right" {{else}}class="box" {{/if}}>
            <div class="inner">
                <p><img alt="{{name}}" src="{{image}}" width="100" height="133"></p>
                <div>
                    <h3>{{name}}</h3>
                    {{#titles}}
                    <p>{{{this}}}</p>
                    {{/titles}}
                    <ul>
                        {{#urls}}
                        <li><a href="{{this}}" target="_blank">{{this}}</a></li>
                        {{/urls}}
                        <li><a href="https://github.com/NikolayIT" target="_blank">https://github.com/NikolayIT</a></li>
                    </ul>
                </div>
            </div>
        </div>
        {{/authors}}`);
    };
}

module.exports = solve;