/** @type {import('../../../models/instance')} */
const prisma = require(process.env.ROOT_PATH + "/models/instance");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function controller(req, res, next) {
  // @section checking id
  var id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.json({
      error: true,
      message: "Invalid id",
      data: [],
    });
  }

  // @section check authorization
  if (!req.isAdmin) {
    return res.json({
      error: true,
      message: "Unauthorized access",
      data: [],
    });
  }

  // @section data builder
  var dataPayload = {
    updatedAt: new Date(),
    filename: req.body.filename,
    size: parseInt(req.body.size),
    mimetype: req.body.mimetype,
  };
  //remove key with null value
  dataPayload = Object.fromEntries(Object.entries(dataPayload).filter(([_, v]) => v != null));

  // @section update storage
  const data = await prisma.storage.update({
    where: {
      id: id,
    },
    data: dataPayload,
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
    message: "Storage updated",
    data: [data],
  });
}

module.exports = controller;
