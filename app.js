require('dotenv').config({ path: './process.env' });

const cors = require('cors');
const express = require('express'); // импортируем экспресс
const bodyParser = require('body-parser'); // подключаем мидлвар для парсинга JSON в body
const mongoose = require('mongoose'); // подключаем mongoose
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorsHandler } = require('./controllers/errors.js');
const router = require('./routes/index.js');

const { PORT, DB } = require('./movies.config.js');

const app = express(); // добавляем экспресс в приложение

const options = {
  origin: [
    `http://localhost:${PORT}`,
    'https://kino-explorer.nomoredomains.icu'
  ]
};

app.use('*', cors(options)); // Подключаем первой миддлварой

// подключаемся к серверу mongo
mongoose.connect(`mongodb://localhost:27017/${DB}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());

app.use(requestLogger); // подключаем логгер запросов

app.use('/', router);

app.use(errorLogger); // подключаем логгер ошибок

app.use((err, req, res, next) => {
  errorsHandler(err, req, res, next);
});
app.listen(PORT);
