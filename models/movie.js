const mongoose = require('mongoose'); // подключаем mongoose
require('mongoose-type-url');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minlength: 1,
  },
  director: {
    type: String,
    required: true,
    minlength: 1,
  },
  duration: {
    type: Number,
    required: true,
    minlength: 1,
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
  },
  image: {
    type: mongoose.SchemaTypes.Url,
    required: true,
    minlength: 1,
  },
  trailer: {
    type: mongoose.SchemaTypes.Url,
    required: true,
    minlength: 1,
  },
  thumbnail: {
    type: mongoose.SchemaTypes.Url,
    required: true,
    minlength: 1,
  },
  owner: {
    type: String,
    required: true,
    minlength: 1,
  },
  movieId: {
    type: String,
    required: true,
    minlength: 1,
  },
  nameRU: {
    type: String,
    required: true,
    minlength: 1,
  },
  nameEN: {
    type: String,
    required: true,
    minlength: 1,
  },
});

module.exports = mongoose.model('movie', movieSchema);
