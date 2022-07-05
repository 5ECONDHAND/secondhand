/** @type {import('../../../models/instance')} */
const prisma = require(process.env.ROOT_PATH + "/models/instance");
const path = require("path");
const storagePATH = path.join(process.env.ROOT_PATH, "storage");
const fs = require("fs");

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

  if (isNaN(id)) {
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
  fs.createReadStream(path.join(storagePATH, data.filename)).pipe(res);
}

module.exports = controller;
