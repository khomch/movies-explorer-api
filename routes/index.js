const router = require('express').Router();

const errorRouter = require('./error.js');
const authRouter = require('./auth.js');
const moviesRouter = require('./movies.js');
const usersRouter = require('./users.js');

router.use(authRouter);
router.use(moviesRouter);
router.use(usersRouter);
router.use(errorRouter);

module.exports = router;
