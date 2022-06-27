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
        || !req.body.description
    ){
      return res.json({
        error: true,
        message: 'Please fill name, price, and description',
        data:[],
      })
    }

    var dataPayload = null;

    if (req.userId) {
      dataPayload = {
        data: {
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
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
        }
      };
    }

    if (req.isAdmin) {
      dataPayload = {
        data: {
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
          User: {
            connect: {
              id: req.body.userId
            }
          },
          Transaction: {
            create: {
              status: 'DECIDING'
            }
          }
        }
      };
    }

    if (dataPayload === null) {
      return res.json({
        error: true,
        message: "Unauthorized access",
        data: [],
      });
    }

    const data = await prisma.product.create({
      ...dataPayload,
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
