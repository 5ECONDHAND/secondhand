/** @type {import('../../../models/instance')} */
const prisma = require(process.env.ROOT_PATH + "/models/instance");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */

async function controller(req, res, next) {
  var id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.json({
      error: true,
      message: "Invalid id",
      data: [],
    });
  }

  var wherePayload = null;

  if (req.userId) {
    wherePayload = {
      where: {
        AND: [
          {
            id: id,
          },
          {
            userId: req.userId,
          },
        ],
      },
    };
  }

  if (req.isAdmin) {
    wherePayload = {
      where: {
        id: id,
      },
    };
  }

  if (wherePayload === null) {
    return res.json({
      error: true,
      message: "Unauthorized access",
      data: [],
    });
  }

  var dataPayload = {
    updatedAt: new Date(),
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  };
  //remove key with null value
  dataPayload = Object.fromEntries(Object.entries(dataPayload).filter(([_, v]) => v != null));

  const data = await prisma.product.updateMany({
    ...wherePayload,
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
    message: "Product updated",
    data: [data],
  });
}

module.exports = controller;
