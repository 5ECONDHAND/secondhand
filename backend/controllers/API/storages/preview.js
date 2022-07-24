/** @type {import('../../../models/instance')} */
const prisma = require(process.env.ROOT_PATH + "/models/instance");
const path = require("path");
const storagePATH = path.join(process.env.ROOT_PATH, "storage");
const fs = require("fs");
const { pipeline } = require("stream");
const got = require('got').default;

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function controller(req, res, next) {
  var id = parseInt(req.params.id);

  var wherePayload = {
    id: id,
  };

  if (!req.params.id.match(/^\d+$/g)) {
    wherePayload = {
      filename: req.params.id
    }
  }

  const data = await prisma.storage.findFirst({
    where: wherePayload
  }).catch((err) => {
    return {
      error: true,
      message: err.message,
      data: [],
    };
  });

  if (data && data.error) {
    return res.json(data);
  }

  if (!data) {
    return res.json({
      error: true,
      message: "Storage not found",
      data: [],
    });
  }

  // set contenttype of response
  res.contentType(data.mimetype || "application/octet-stream");
  // read file from data.filename, then stream to response
  var sourceStream = null;

  if (process.env.STORAGE_TYPE == 'local') {
    // check if file exists
    if (!fs.existsSync(path.join(storagePATH, data.filename))) {
      return res.json({
        error: true,
        message: "File not found",
        data: [],
      });
    }

    sourceStream = fs.createReadStream(path.join(storagePATH, data.filename));
  }

  if (process.env.STORAGE_TYPE == 's3') {
    var s3bucket = process.env.S3_BUCKET || 'undefinedbucket';
    var s3endpoint = process.env.S3_ENDPOINT || 'http://127.0.0.1:9000';
    var s3url = s3endpoint + '/' + s3bucket + '/' + data.filename;

    sourceStream = got.stream(s3url);
  }

  if (!sourceStream) {
    return res.json({
      error: true,
      message: "Can't read file content",
      data: [],
    });
  }

  pipeline(sourceStream, res, (err) => {
    if (err) {
      console.log(err);
    }
  });
}

module.exports = controller;
