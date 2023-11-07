const AppError = require('../utils/appError');

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}:${err.value}`;
  return new AppError(message, 400)
}

const sendErrorDev = (err, req, res) => {
  // eslint-disable-next-line no-console
  console.error('Error💥', err);
  res.status(err.statusCode).render('error', {
    title: 'Something went wrong!!!',
    msg: err.message
  })
}

const sendErrorProd = (err, req, res) => {
  // eslint-disable-next-line no-console
  console.error('Error💥', err);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!'
  })
}

module.exports = (err, req, res) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err }

    if (error.name === 'CastError') error = handleCastErrorDB(error);

    sendErrorProd(error, req, res)
  }
}