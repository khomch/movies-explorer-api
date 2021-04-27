const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUserProfile,
  updateProfile,
} = require('../controllers/users');

router.get('/me', getUserProfile);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2),
    email: Joi.string().required().min(2).email(),
  }),
}), updateProfile);

module.exports = router;
