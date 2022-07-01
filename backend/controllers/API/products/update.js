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

  // @section checking authorization
  const existingData = await prisma.product.findFirst({
    where: {
      id: id
    },
    select: {
      id: true,
      userId: true
    }
  }).catch((err) => {
    return {
      error: true,
      message: err.message,
      data: [],
    };
  });

  if (existingData && existingData.error) {
    return res.json(existingData);
  }

  if (
    req.userId != existingData.userId
    && !req.isAdmin
  ) {
    return res.json({
      error: true,
      message: "Unauthorized access",
      data: [],
    });
  }

  // @section data builder
  var dataPayload = {
    updatedAt: new Date(),
    name: req.body.name,
    price: req.body.price,
    status: req.body.status,
    description: req.body.description,
  };
  //remove key with null value
  dataPayload = Object.fromEntries(Object.entries(dataPayload).filter(([_, v]) => v != null));

  // @section Categories builder
  if (
    req.body.categories != null
    && Array.isArray(req.body.categories)
    && req.body.categories.length > 0
  ) {
    dataPayload.Categories = {
      deleteMany: {},
      connectOrCreate: []
    };

    var errorInLoop = false;
    for (var i = 0; i < req.body.categories.length; i++) {
      var categoryId = parseInt(req.body.categories[i]);
      if (isNaN(categoryId)) {
        errorInLoop = 'Invalid category id';
        break;
      }

      dataPayload.Categories.connectOrCreate.push({
        create: {
          categoryId
        },
        where: {
          categoryId_productId: {
            categoryId,
            productId: id
          }
        }
      })
    }

    if (errorInLoop) {
      return res.json({
        error: true,
        message: errorInLoop,
        data: [],
      });
    }
  }

  // @section update product
  const data = await prisma.product.update({
    where: {
      id: id
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
    message: "Product updated",
    data: [data],
  });
}

module.exports = controller;
