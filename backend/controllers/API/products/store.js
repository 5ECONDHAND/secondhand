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

    var countProduct = await prisma.product.count({
      'where': {
        'userId': req.userId,
      }
    })

    var dataPayload = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
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
              filename: req.files[i].filename,
              mimetype: req.files[i].mimetype,
              size: req.files[i].size
            }
          }
        });
      }
    }

    const data = await prisma.product.create({
      data: dataPayload
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
      message: 'Product created',
      data: [data],
    })
}

module.exports = controller
