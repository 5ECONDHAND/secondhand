const multer = require('multer');
const path = require('path');
const uuid = require('uuid');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');
const S3_TLS = process.env.S3_TLS == 'true'
  ? true
  : false;

const s3  = new S3Client({
  credentials: {
    accessKeyId: process.env.S3_ACCESSKEY || 'undefinedkey',
    secretAccessKey: process.env.S3_SECRETKEY || 'undefinedkey',
  },
  endpoint: process.env.S3_ENDPOINT || 'http://127.0.0.1:9000',
  region: process.env.S3_REGION || 'us-east-1', // just formality
  forcePathStyle: true,
  tls: S3_TLS
});

const storageS3 = multerS3({
  s3,
  bucket: process.env.S3_BUCKET || 'undefinedbucket',
  acl: 'public-read',
  'contentType': function(req, file, cb) {
    cb(null, file.mimetype);
  },
  metadata: function (req, file, cb) {
    cb(null, {'Content-Type': file.mimetype});
  },
  key: function (req, file, cb) {
    cb(null, uuid.v4());
  }
});
const storageLocal = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.env.ROOT_PATH, 'storage'));
  },
  filename: (req, file, cb) => {
    cb(null, uuid.v4());
  }
});

const uploader = multer({
  storage: process.env.STORAGE_TYPE == 's3' ? storageS3:storageLocal,
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
}).fields([
  {
    name: 'files',
    maxCount: 3
  },
  {
    name: 'files[]',
    maxCount: 3
  }
]);

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
