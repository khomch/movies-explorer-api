const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { auth } = require('../middlewares/auth.js');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies.js');

router.get('/movies', auth, getMovies);

router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(1),
    director: Joi.string().required().min(1),
    duration: Joi.number().required().min(1),
    year: Joi.string().required().min(1),
    description: Joi.string().required().min(1),
    image: Joi.string().required().min(1).regex(/^(ftp|http|https):\/\/[^ "]+$/),
    trailer: Joi.string().required().min(1).regex(/^(ftp|http|https):\/\/[^ "]+$/),
    thumbnail: Joi.string().required().min(1).regex(/^(ftp|http|https):\/\/[^ "]+$/),
    movieId: Joi.number().required().min(1),
    nameRU: Joi.string().required().min(1),
    nameEN: Joi.string().required().min(1),
  }),
}), auth, createMovie);

router.delete('/movies/:id', celebrate({
  params: Joi.object().keys({
    id: Joi
      .string()
      .required()
      .hex()
      .length(24),
  }),
}), auth, deleteMovie);

module.exports = router;
