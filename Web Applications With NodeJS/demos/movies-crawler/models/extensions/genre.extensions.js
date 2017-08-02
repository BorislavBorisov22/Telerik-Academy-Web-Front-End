const { Genre } = require('../genre.model');
const initDomParser = require('../../dom-parser');

const { DETAILS } = require('../../selectors');

Genre.fromHtml = (html) => {
    return initDomParser(html)
    .then($ => {
        const genreName = $(DETAILS.GENRE_NAME_SELECTOR).html(); 

        const movies = [];
        const moviesIds = $(DETAILS.MOVIE_ID_SELECTOR);
        moviesIds.each((_, el) => {
            const $currentElement = $(el);
            let id = $currentElement.attr('href');
            
            id = id.substring('/title/'.length);
            movies.push(id);
        });
        
        return new Genre(genreName, movies);
    });
};