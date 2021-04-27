require('dotenv').config({ path: './process.env' });

const cors = require('cors');
const express = require('express'); // импортируем экспресс
const bodyParser = require('body-parser'); // подключаем мидлвар для парсинга JSON в body
const mongoose = require('mongoose'); // подключаем mongoose
const { requestLogger, errorLogger } = require('./middlewares/logger');
const usersRouter = require('./routes/users.js'); // пользовательский роутер
const authRouter = require('./routes/auth.js');
const errorRouter = require('./routes/error.js');
const moviesRouter = require('./routes/movies.js');
const { auth } = require('./middlewares/auth.js');
const { errorsHandler } = require('./controllers/errors.js');

const { PORT, DB } = require('./movies.config.js');

const app = express(); // добавляем экспресс в приложение

const options = {
  origin: [
    `http://localhost:${PORT}`,
  ],
  credentials: true, // эта опция позволяет устанавливать куки
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

app.use('/', authRouter);
app.use('/users', auth, usersRouter);
app.use('/movies', auth, moviesRouter);
app.use('/', errorRouter);

app.use(errorLogger); // подключаем логгер ошибок

app.use((err, req, res, next) => {
  errorsHandler(err, req, res, next);
});
app.listen(PORT);
