const express = require('express');
const morgan = require('morgan');

const courseRouter = require('./routes/courseRoutes');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/courses', courseRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
})

app.use(globalErrorHandler);

module.exports = app;