/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
function controller(req, res, next) {
  res.json({
    error: true,
    message: 'Not found',
    data: [],
  })
}

module.exports = controller;
