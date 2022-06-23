/** @type {import('../../../models/instance')} */
const prisma = require(process.env.ROOT_PATH + '/models/instance');

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function controller(req, res, next) {
  var wherePayload = null;

  if (req.userId) {
    wherePayload = {
      where: {
        User: {
          is: {
            id: req.userId
          }
        }
      }
    };
  }

  if (req.isAdmin) {
    wherePayload = {};
  }

  if (wherePayload === null) {
    return res.json({
      error: true,
      message: 'Unauthorized access',
      data: [],
    });
  }

  const data = await prisma.notification.findMany({
    ...wherePayload,
    include: {
      User: true
    }
  }).catch(err => {
    return {
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
    message: "Success",
    data,
  });
}

module.exports = controller;
