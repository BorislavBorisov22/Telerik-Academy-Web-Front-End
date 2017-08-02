require('./polyfills');
require('./models/extensions');

const { parseGenre } = require('./parsers/genre.parser');
const { parseMovie } = require('./parsers/movie.parser');

const moviesBaseUrl = 'http://www.imdb.com/title/';
const genresBaseUrl = 'http://www.imdb.com/genre/';

const genresNames = ['action', 'comedy'];
const movies = [];

const loadMovie = (queue) => {
    if (queue.isEmpty()) {
        return Promise.resolve();
    }

    const id = queue.dequeue();
    return parseMovie(moviesBaseUrl + id)
        .then(movie => {
            movies.push(movie);
            return loadMovie(queue);
        });
};

const loadMovies = (queue) => {
    const parallelLoads = 4;

    return Promise.all(
            Array.from({ length: parallelLoads })
            .map(_ => {
                return loadMovie(queue);
            }))
        .then(() => {
            console.log(movies);
        });
};

const queue = require('./queue').getQueue();
const loadAll = () => {
    return Promise.all(
            genresNames.map(genreName => {
                return parseGenre(genresBaseUrl + genreName)
                    .then((g) => {
                        queue.enqueueMany(...g.moviesIds);
                    });
            })
        )
        .then(() => {
            return loadMovies(queue);
        });
};

const start = new Date();
loadAll()
    .then(() => {});