const path = require('path');

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
function controller(req, res, next) {
  res.sendFile(path.join(process.env.ROOT_PATH, 'views/index.html'));
}

module.exports = controller;
