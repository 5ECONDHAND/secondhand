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

  const userData = await prisma.user.findFirst({
    where: {
      id: req.userId
    },
    select: {
      city: true,
      phoneNo: true,
      address: true
    }
  }).catch((err) => {
    return {
      error: true,
      message: err.message,
      data: [],
    };
  });

  if (userData && userData.error) {
    return res.json(userData);
  }

  if (!userData) {
    return res.json({
      error: true,
      message: 'Unauthorized access',
      data: [],
    })
  }

  if (
    !userData.address
    || !userData.phoneNo
    || !userData.city
  ) {
    return res.json({
      error: true,
      message: 'Please complete your profile first',
      data: [],
    })
  }

  const productData = await prisma.product.findFirst({
    where: {
      id: productId
    },
    select: {
      userId: true,
      name: true,
      id: true,
      price: true
    },
    include: {
      Photos: true
    }
  }).catch((err) => {
    return {
      error: true,
      message: err.message,
      data: [],
    };
  });

  if (productData && productData.error) {
    return res.json(productData);
  }

  if (!productData) {
    return res.json({
      error: true,
      message: 'Product not found',
      data: [],
    });
  }

  if (req.userId == productData.userId) {
    return res.json({
      error: true,
      message: 'You cannot bid on your own product',
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

  if (!data) {
    return res.json({
      error: true,
      message: "No transaction found with this productId",
      data: [],
    });
  }

  const notifData = {
    title: 'Produk ditawar',
    productName: productData.name,
    productId: productData.id,
    realPrice: productData.price,
    offeredPrice: offeredPrice,
    imageId: productData.Photos && productData.Photos[0] && productData.Photos[0].id,
    bidder: req.userId
  }

  const notificationSeller = await prisma.notification.create({
    data: {
      data: JSON.stringify(notifData),
      userId: productData.userId,
    }
  }).catch(err => {
    return{
      error: true,
      message: err.message,
      data: [],
    }
  });

  if(notificationSeller && notificationSeller.error){
    return res.json(notificationSeller)
  }

  delete notifData.bidder;
  notifData.title = 'Berhasil menawar produk';
  notifData.seller = productData.userId;

  const notificationBuyer = await prisma.notification.create({
    data: {
      data: JSON.stringify(notifData),
      userId: req.userId,
    }
  }).catch(err => {
    return{
      error: true,
      message: err.message,
      data: [],
    }
  });

  if(notificationBuyer && notificationBuyer.error){
    return res.json(notificationBuyer)
  }

  res.json({
    error: false,
    message: 'Bid created',
    data: [data],
  })
}

module.exports= controller;
