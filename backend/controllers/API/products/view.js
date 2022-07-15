/** @type {import('../../../models/instance')} */
const prisma = require(process.env.ROOT_PATH + "/models/instance");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */

async function controller(req, res, next) {
  var id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.json({
      error: true,
      message: "Invalid id",
      data: [],
    });
  }

  const wherePayload = {
    AND: [
      {
        status: 'PUBLISH'
      },
      {
        id: id
      }
    ]
  };

  if (req.userId) {
    wherePayload.AND.shift();
  }

  const data = await prisma.product.findFirst({
    where: wherePayload,
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
      Transaction: {
        include: {
          Users: {
            select: {
              accepted: true,
              offeredPrice: true,
              description: true,
              User: {
                select: {
                  id: true,
                  phoneNo: true,
                  fullname: true,
                  email: true,
                  city: true,
                  address: true,
                  Photos: true,
                }
              },
              createdAt: true
            }
          }
        }
      }
    }
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
    data: [data],
  });
}

module.exports = controller;
