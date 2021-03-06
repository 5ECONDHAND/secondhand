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
      !req.body.name
      || !req.body.price
      || !req.body.categoryId
      || !req.body.description
  ){
    return res.json({
      error: true,
      message: 'Please fill name, price, categoryId, and description',
      data:[],
    })
  }

  var categoryId = parseInt(req.body.categoryId);

  if (isNaN(categoryId)) {
    return res.json({
      error: true,
      message: "Invalid categoryId",
      data: [],
    });
  }

  if (!req.userId) {
    return res.json({
      error: true,
      message: "Unauthorized access",
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

  const countProduct = await prisma.product.count({
    where: {
      userId: req.userId,
    }
  }).catch(err => {
    return{
      error: true,
      message: err.message,
      data: [],
    }
  });

  if (countProduct && countProduct.error) {
    return res.json(countProduct);
  }

  if (countProduct >= 4) {
    return res.json({
      error: true,
      message: "You can't create anymore products",
      data: [],
    });
  }

  var dataPayload = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    status: req.body.status || 'DRAFT',
    Categories: {
      create: {
        categoryId
      }
    },
    User: {
      connect: {
        id: req.userId
      }
    },
    Transaction: {
      create: {
        status: 'DECIDING'
      }
    }
  };

  if (
    req.files != null
    && Array.isArray(req.files)
    && req.files.length > 0
  ) {
    dataPayload.Photos = {
      create: []
    };

    for (var i = 0; i < req.files.length; i++) {
      dataPayload.Photos.create.push({
        Storage: {
          create: {
            filename: req.files[i].filename || req.files[i].key,
            mimetype: req.files[i].mimetype,
            size: req.files[i].size
          }
        }
      });
    }
  }

  const data = await prisma.product.create({
    data: dataPayload,
    include: {
      Photos: true
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

  const priceFormat = data.price
    ? data.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    : '0';

  const notifData = {
    title: 'Produk dibuat',
    subTitle: data.name,
    body: 'Rp. ' + priceFormat,
    subBody: '',
    imageId: data.Photos && data.Photos[0] && data.Photos[0].id,
    seller: data.userId
  }

  const notificationSeller = await prisma.notification.create({
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

  if(notificationSeller && notificationSeller.error){
    return res.json(notificationSeller)
  }

  res.json({
    error: false,
    message: 'Product created',
    data: [data],
  })
}

module.exports = controller
