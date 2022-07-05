/** @type {import('../../../models/instance')} */
const prisma = require(process.env.ROOT_PATH + "/models/instance");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function controller(req, res, next) {
  if (
    req.files == null
    || !Array.isArray(req.files)
    || req.files.length <= 0
  ) {
    return res.json({
      error: true,
      message: "Please fill files",
      data: [],
    });
  }

  if (!req.isAdmin) {
    return res.json({
      error: true,
      message: "Unauthorized access",
      data: [],
    });
  }

  const data = await prisma.storage.create({
    data: {
      filename: req.files[0].filename,
      size: req.files[0].size,
      mimetype: req.files[0].mimetype,
    }
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

  res.json({
    error: false,
    message: "Storage created",
    data: [data],
  });
}

module.exports = controller;
