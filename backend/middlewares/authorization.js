const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

/**
 * JWT Object
 *
 * {
 * userId: angkaID,
 * loggedIn: boolean
 * }
 */

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function middleware(req, res, next) {
  const appliedPaths = [
    ///^\/api\/?(?:[^\/]+\/?)*$/g,
    //'/api',
    ///\/api\/(?=\.|\/|$)\S*/g,

    /^\/api\//g
  ];

  // check is path is in appliedPaths, regex
  if (!appliedPaths.some(path => req.path.match(path))) {
    return next();
  }

  // bypass if already admin
  if (req.isAdmin) {
    return next();
  }

  // object has own property
  if(!req.headers) {
    return next();
  }

  var token = req.headers.hasOwnProperty('token')
  ? req.headers.token
  : (
    req.headers.hasOwnProperty('authorization')
    ? req.headers.authorization.split(' ')[1]
    : null
  );

  if(!token) {
    return next();
  }

  jwt.verify(token, jwtSecret, (err, result) => {
    if(!err && result.loggedIn) {
      req.loggedIn = true;
      req.userId = result.userId;
      req.isAdmin = result.isAdmin || false;
    }

    next();
  });
}

module.exports = middleware;
