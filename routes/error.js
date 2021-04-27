const router = require('express').Router();
const { getError } = require('../controllers/errors');

router.all('*', getError);

module.exports = router;
