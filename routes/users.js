const router = require('express').Router();

const {
  getUserProfile,
  updateProfile,
} = require('../controllers/users');

router.get('/me', getUserProfile);
router.patch('/me', updateProfile);

module.exports = router;
