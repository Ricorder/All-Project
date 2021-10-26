const createError = require('http-errors');

function createErr (req, res, next) {
  const error = createError(404, 'Запрашиваемой страницы не существует на сервере.');
  next(error);
}

function cathErrAndSendAnswer (err, req, res) {
  const appMode = req.app.get('env');
  let error;

  if (appMode === 'development') {
    error = err;
  } else {
    error = {};
  }

  res.locals.message = err.message;
  res.locals.error = error;
  res.status(err.status || 500).render('error');
}

module.exports = {
  createErr,
  cathErrAndSendAnswer,
}