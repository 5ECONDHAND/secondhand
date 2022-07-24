/** @type {import('../../../models/instance')} */
const prisma = require(process.env.ROOT_PATH + '/models/instance');

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function controller(req, res, next) {
  if (!req.userId) {
    return res.json({
      error: true,
      message: 'Unauthorized access',
      data: [],
    });
  }

  const wherePayload = {
    User: {
      is: {
        id: req.userId
      }
    }
  };

  const data = await prisma.notification.findMany({
    where: wherePayload,
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
