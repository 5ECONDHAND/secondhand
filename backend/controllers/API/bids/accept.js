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

  const transactionData = await prisma.transaction.findFirst({
    where: {
      productId,
    },
    select: {
      status: true
    }
  }).catch((err) => {
    return {
      error: true,
      message: err.message,
      data: [],
    };
  });

  if (transactionData && transactionData.error) {
    return res.json(productData);
  }

  // this is strange condition, because a product must have transaction
  if (!transactionData) {
    return res.json({
      error: true,
      message: "Cannot accept bid, transaction not found",
      data: [],
    });
  }

  if (transactionData.status == 'ACCEPTED') {
    return res.json({
      error: true,
      message: "Cannot accept anymore bid, this product has accepted some bid",
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
        updateMany: {
          where: {
            userId
          },
          data: {
            accepted: true
          }
        }
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

  const notifData = {
    title: 'Penawaran Diterima',
    productName: productData.name,
    productId: productData.id,
    realPrice: productData.price,
    offeredPrice: pivotTable.offeredPrice,
    imageId: productData.Photos && productData.Photos[0] && productData.Photos[0].id,
    seller: productData.userId
  }

  const notification = await prisma.notification.create({
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

  if(notification && notification.error){
    return res.json(notification)
  }

  res.json({
    error: false,
    message: "Bid accepted",
    data: [data],
  });
}

module.exports = controller;
