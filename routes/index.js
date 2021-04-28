const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { auth } = require('../middlewares/auth.js');
const { getError } = require('../controllers/errors');
const {
  createUser,
  login,
} = require('../controllers/auth');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies.js');
const {
  getUserProfile,
  updateProfile,
} = require('../controllers/users');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).email(),
    password: Joi.string().required().min(2),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().min(2).email(),
    password: Joi.string().required(),
  }),
}), createUser);

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

router.delete('/movies/:movieId', auth, deleteMovie);

router.get('/users/me', auth, getUserProfile);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().min(2).email(),
  }),
}), auth, updateProfile);

router.all('*', getError);

module.exports = router;
