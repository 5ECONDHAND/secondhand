const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.env.ROOT_PATH, 'storage'));
  },
  filename: (req, file, cb) => {
    //randomized characters for file name with 25 length
    cb(null, Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
  }
});
const uploader = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
  fileFilter: (req, file, cb) => {
    // filter image only by mimetype
    if (!file.mimetype.match(/image\/(png|jpeg|jpg)/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }

    cb(null, true);
  }
}).array('files', 3);

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

    /^\/api\/products(\/[0-9]+)?$/g,
    /^\/api\/users(\/[0-9]+)?$/g,
    /^\/api\/storages(\/)?$/g,
  ];

  // check is path is in appliedPaths, regex
  if (!appliedPaths.some(path => req.path.match(path))) {
    return next();
  }

  // skip guest
  if (!req.loggedIn) {
    return next();
  }

  // object has own property
  if(!req.headers) {
    return next();
  }

  uploader(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res.json({
        error: true,
        message: err.message,
        data: [],
      });
    }

    if (err) {
      // An unknown error occurred when uploading.
      return res.json({
        error: true,
        message: err.toString(),
        data: [],
      });
    }

    return next();
  });
}

module.exports = middleware;
