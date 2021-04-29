const Movie = require('../models/movie.js');

const NotFoundError = require('../errors/not-found-err.js');
const BadRequest = require('../errors/bad-request.js');
const DuplicateError = require('../errors/duplicate-err.js');
const NoPermissionError = require('../errors/no-permission-err.js');

const getMovies = (req, res, next) => {
  Movie.find({
    owner: req.user._id,
  }, '-owner')
    .then((movies) => {
      if (!movies) {
        throw new NotFoundError('Фильмы не найдены');
      } else {
        return res.status(200).send(movies);
      }
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body; // получим из объекта запроса имя и ссылку на карточку
  Movie.findOne({ movieId })
    .then((movie) => {
      if (movie) {
        throw new DuplicateError('Фильм с таким ID уже сохранен');
      } if (!movie) {
        Movie.create({
          country,
          director,
          duration,
          year,
          description,
          image,
          trailer,
          thumbnail,
          owner: req.user._id,
          movieId,
          nameRU,
          nameEN,
        })
          .then((movieCreated) => {
            res.status(200).send({
              _id: movieCreated._id,
              country: movieCreated.country,
              director: movieCreated.director,
              duration: movieCreated.duration,
              year: movieCreated.year,
              description: movieCreated.description,
              image: movieCreated.image,
              trailer: movieCreated.trailer,
              thumbnail: movieCreated.thumbnail,
              movieId: movieCreated.movieId,
              nameRU: movieCreated.nameRU,
              nameEN: movieCreated.nameEN,
            });
          })
          .catch((err) => {
            if (err.name === 'ValidationError') {
              throw new BadRequest('Ошибка валидации');
            } else {
              next(err);
            }
          });
      } else {
        throw new BadRequest('Ошибка при добавлении фильма');
      }
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const regex = /^[0-9A-Fa-f]{24}$/;
  if (!regex.test(req.params.id)) {
    throw new BadRequest('Невалидный id фильма');
  } else {
    Movie.findById(req.params.id)
      .then((movie) => {
        if (!movie) {
          throw new NotFoundError('Нет такого фильма');
        } else if (`${movie.owner}` !== req.user._id) {
          throw new NoPermissionError('Нельзя удалять чужие фильмы');
        } else {
          Movie.findByIdAndRemove(req.params.id)
            .then((movieDeleted) => {
              const {
                _id,
                country,
                director,
                duration,
                year,
                description,
                image,
                trailer,
                thumbnail,
                movieId,
                nameRU,
                nameEN,
              } = movieDeleted;
              if (!movieDeleted) {
                throw new NotFoundError('Нет фильма с таким id');
              } else {
                return res.status(200).send({
                  _id,
                  country,
                  director,
                  duration,
                  year,
                  description,
                  image,
                  trailer,
                  thumbnail,
                  movieId,
                  nameRU,
                  nameEN,
                });
              }
            });
        }
      })
      .catch(next);
  }
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
