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
      message: "Invalid productId",
      data: [],
    });
  }

  if (!req.userId) {
    return res.json({
      error: true,
      message: 'Unauthorized access',
      data: [],
    })
  }

  // @section data builder
  var dataPayload = {
    offeredPrice: req.body.offeredPrice,
    description: req.body.description,
  };
  //remove key with null value
  dataPayload = Object.fromEntries(Object.entries(dataPayload).filter(([_, v]) => v != null));

  // parse safe
  if (dataPayload.offeredPrice) {
    dataPayload.offeredPrice = parseFloat(req.body.offeredPrice).toFixed(2);
  }

  // @section update
  const data = await prisma.transaction.update({
    where: {
      productId: id
    },
    data: {
      Users: {
        updateMany: {
          where: {
            userId: req.userId
          },
          data: dataPayload
        }
      }
    },
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
    message: "Bid updated",
    data: [data],
  });
}

module.exports = controller;
