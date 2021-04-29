const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { auth } = require('../middlewares/auth.js');

const {
  getUserProfile,
  updateProfile,
} = require('../controllers/users');

router.get('/users/me', auth, getUserProfile);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().min(2).email(),
  }),
}), auth, updateProfile);

module.exports = router;
