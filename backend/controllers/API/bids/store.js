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
    },
    include: {
      Product: {
        include: {
          Photos: true
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

  if (!data) {
    return res.json({
      error: true,
      message: "No transaction found with this productId",
      data: [],
    });
  }

  const notifData = {
    title: 'Penawaran Produk',
    productName: data.Product.name,
    productId: data.Product.id,
    realPrice: data.Product.price,
    offeredPrice: offeredPrice,
    imageId: data.Product.Photos && data.Product.Photos[0] && data.Product.Photos[0].id,
    bidder: req.userId
  }

  const notification = await prisma.notification.create({
    data: {
      data: JSON.stringify(notifData),
      userId: data.Product.userId,
    }
  }).catch(err => {
    return{
      error: true,
      message: err.message,
      data: [],
    }
  });

  if(notification && notification.error){
    return res.json(notification)
  }

  res.json({
    error: false,
    message: 'Bid created',
    data: [data],
  })
}

module.exports= controller;
