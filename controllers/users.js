const User = require('../models/user.js');

const NotFoundError = require('../errors/not-found-err.js');

const getUserProfile = (req, res, next) => {
  User.findOne({
    _id: req.user._id,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      } else {
        return res.status(200).send(user);
      }
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const {
    name,
    email,
  } = req.body; // получим из объекта запроса имя, описание и аватар пользователя
  User.findByIdAndUpdate(req.user._id, {
    name,
    email,
  }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      return res.status(200).send(user);
    })
    .catch(next);
};

module.exports = {
  getUserProfile,
  updateProfile,
};
