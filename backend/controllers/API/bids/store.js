/** @type {import('../../../models/instance')} */
const prisma = require(process.env.ROOT_PATH + '/models/instance');

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function controller(req, res, next){
  if(
    !req.body.productId
    || !req.body.offeredPrice
  ){
    return res.json({
      error: true,
      message: 'Please fill productId, and offeredPrice',
      data: [],
    })
  }

  if (!req.userId) {
    return res.json({
      error: true,
      message: 'Unauthorized access',
      data: [],
    })
  }

  var productId = parseInt(req.body.productId);
  var offeredPrice = parseFloat(req.body.offeredPrice).toFixed(2);

  if (isNaN(productId)) {
    return res.json({
      error: true,
      message: "Invalid productId",
      data: [],
    });
  }

  if (isNaN(offeredPrice)) {
    return res.json({
      error: true,
      message: "Invalid offeredPrice",
      data: [],
    });
  }

  const data = await prisma.transaction.update({
    where: {
      productId,
    },
    data: {
      Users: {
        deleteMany: {
          userId: req.userId,
        },
        create: {
          offeredPrice,
          userId: req.userId,
        }
      }
    }
  }).catch(err => {
    return{
      error: true,
      message: err.message,
      data: [],
    }
  });

  if(data && data.error){
    return res.json(data)
  }

  res.json({
    error: false,
    message: 'Bid created',
    data: [data],
  })
}

module.exports= controller;
