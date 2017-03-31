/* globals $ */

function solve() {

    return function(selector) {
        var template = `<div class="container">
            <h1>Animals</h1>
            <ul class="animals-list">
                {{#each this.animals}}
                <li>
                    {{#if this.url}}
                    <a href={{this.url}}>See a {{this.name}}</a> {{else}}
                    <a href='http://cdn.playbuzz.com/cdn/3170bee8-985c-47bc-bbb5-2bcb41e85fe9/d8aa4750-deef-44ac-83a1-f2b5e6ee029a.jpg'>No link for {{this.name}}, here is Batman!</a> 
                    {{/if}}
                </li>
                {{/each}}
            </ul>
        </div>`;
        /* insert the template here as a string
               example:
               var template =
                 '<ul>' +
                   '{{#students}}' +
                   '<li>' +
                     '{{name}}' +
                   '</li>' +
                   '{{/students}}' +
                 '</ul>';
           */

        $(selector).html(template);
    };
};

module.exports = solve;