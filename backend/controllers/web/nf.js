var createError = require('http-errors');

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
function controller(req, res, next) {
  next(createError(404));
}

module.exports = controller;
