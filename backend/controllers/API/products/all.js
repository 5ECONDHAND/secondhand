/** @type {import('../../../models/instance')} */
const prisma = require(process.env.ROOT_PATH + "/models/instance");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function controller(req, res, next) {
  const advanceLogicPayload = {};

  if (req.query.take) {
    var take = parseInt(req.query.take);
    advanceLogicPayload.take = isNaN(take)
      ? 10
      : take;
  }

  if (req.query.skip) {
    var skip = parseInt(req.query.skip);
    advanceLogicPayload.skip = isNaN(skip)
      ? 0
      : skip;
  }

  if (req.query.orderBy) {
    var availableDirection = ['asc', 'desc'];
    var direction = req.query.orderByDirection
      ? req.query.orderByDirection.toLowerCase()
      : 'desc';

    // check direction (is available)
    direction = availableDirection.includes(direction)
      ? direction
      : 'desc';

    advanceLogicPayload.orderBy = {
      [req.query.orderBy]: direction
    };
  } else {
    advanceLogicPayload.orderBy = {
      createdAt: 'desc'
    };
  }


  const wherePayload = {};

  if(req.query.search){
    if (!wherePayload.hasOwnProperty('where')) {
      wherePayload.where = {};
    }
    if (!wherePayload.where.hasOwnProperty('OR')) {
      wherePayload.where.OR = [];
    }

    wherePayload.where.OR.push({
      name: {
        contains: req.query.search,
        mode: 'insensitive' // case-insensitive
      }
    })
  }

  if(req.query.categoryId){
    var categoryId = parseInt(req.query.categoryId);
    if (isNaN(categoryId)) {
      return res.json({
        error: true,
        message: "Invalid categoryId",
        data: [],
      });
    }

    if (!wherePayload.hasOwnProperty('where')) {
      wherePayload.where = {};
    }
    if (!wherePayload.where.hasOwnProperty('OR')) {
      wherePayload.where.OR = [];
    }

    wherePayload.where.OR.push({
      Categories: {
        some: {
          categoryId
        }
      }
    })
  }

  const data = await prisma.product.findMany({
    ...advanceLogicPayload,
    ...wherePayload,
    include: {
      User: {
        select: {
          id: true,
          phoneNo: true,
          fullname: true,
          email: true,
          city: true,
          Photos: true,
          createdAt: true,
          updatedAt: true
        }
      },
      Photos: {
        include: {
          Storage: true
        }
      },
      Categories: {
        include: {
          Category: true
        }
      },
      Transaction: true
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
    message: "Success",
    data,
  });

}

module.exports = controller;
