const { Movie } = require('../movie.model');
const { DETAILS } = require('../../selectors');
const initDomParser = require('../../dom-parser');

Movie.fromHtml = (html) => {
    return initDomParser(html)
    .then($ => {
        let movieName = $(DETAILS.MOVIE_TITLE_SELECTOR).html();
        movieName = movieName.split('&nbsp;')[0];
        const moviePosterUrl = $(DETAILS.MOVI_POSTER_IMAGE_URL).attr('src');

        return new Movie(movieName, moviePosterUrl);
    });
};