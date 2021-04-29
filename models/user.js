const mongoose = require('mongoose'); // подключаем mongoose
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: (props) => `${props.value} — не имейл`,
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
