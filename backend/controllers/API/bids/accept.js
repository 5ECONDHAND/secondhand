/** @type {import('../../../models/instance')} */
const prisma = require(process.env.ROOT_PATH + "/models/instance");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */

async function controller(req, res, next) {
  if(
    !req.body.productId
    || !req.body.userId
  ){
    return res.json({
      error: true,
      message: 'Please fill productId, and userId',
      data: [],
    })
  }

  var productId = parseInt(req.body.productId);

  if (isNaN(productId)) {
    return res.json({
      error: true,
      message: "Invalid productId",
      data: [],
    });
  }

  var userId = parseInt(req.body.userId);

  if (isNaN(userId)) {
    return res.json({
      error: true,
      message: "Invalid userId",
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

  const productData = await prisma.product.findFirst({
    where: {
      id: productId
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
      message: "Product not found",
      data: [],
    });
  }

  if (req.userId != productData.userId) {
    return res.json({
      error: true,
      message: "Unauthorized access",
      data: [],
    });
  }

  const pivotTable = await prisma.transactionsOnUsers.findFirst({
    where: {
      userId
    }
  }).catch((err) => {
    return {
      error: true,
      message: err.message,
      data: [],
    };
  });

  if (pivotTable && pivotTable.error) {
    return res.json(pivotTable);
  }

  if (!pivotTable) {
    return res.json({
      error: true,
      message: "User has not made any bid",
      data: [],
    });
  }

  const data = await prisma.transaction.update({
    where: {
      productId,
    },
    data: {
      Users: {
        updateMany: [
          {
            where: {
              accepted: true
            },
            data: {
              accepted: false
            }
          },
          {
            where: {
              userId
            },
            data: {
              accepted: true
            }
          }
        ]
      },
      status: 'ACCEPTED'
    }
  }).catch((err) => {
    return {
      error: true,
      message: err.message,
      data: [],
    };
  });

  const priceFormatReal = productData.price
    ? productData.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    : '0';

  const priceFormatOffer = pivotTable.offeredPrice
    ? pivotTable.offeredPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    : '0';

  const notifData = {
    title: 'Penawaran diterima',
    subTitle: productData.name,
    body: 'Rp. ' + priceFormatReal,
    subBody: 'Ditawar Rp. ' + priceFormatOffer,
    imageId: productData.Photos && productData.Photos[0] && productData.Photos[0].id,
    seller: productData.userId
  }

  const notificationBuyer = await prisma.notification.create({
    data: {
      data: JSON.stringify(notifData),
      userId,
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

  delete notifData.seller;
  notifData.title = 'Berhasil menerima penawaran';
  notifData.bidder = userId;

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

  res.json({
    error: false,
    message: "Bid accepted",
    data: [data],
  });
}

module.exports = controller;
