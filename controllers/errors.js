const NotFoundError = require('../errors/not-found-err.js');

const getError = () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
};

const errorsHandler = (err, req, res, next) => {
  if (err.details !== undefined) {
    const errorBody = err.details.get('body'); // 'details' is a Map()
    const { details: [errorDetails] } = errorBody;
    return res.status(400).send({
      message: errorDetails.message,
    });
  }
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  return next();
};

module.exports = { getError, errorsHandler };
