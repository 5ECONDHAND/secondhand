/** @type {import('../../../models/instance')} */
const prisma = require(process.env.ROOT_PATH + '/models/instance');

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function controller(req, res, next) {
  var id = parseInt(req.params.id);

  if(isNaN(id)) {
    return res.json({
      error: true,
      message: 'Invalid id',
      data: [],
    })
  }

  if (!req.userId) {
    return res.json({
      error: true,
      message: 'Unauthorized access',
      data: [],
    });
  }

  const wherePayload = {
    AND: [
      {
        id: id
      },
      {
        userId: req.userId
      }
    ]
  };

  const data = await prisma.notification.deleteMany({
    where: wherePayload,
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
    message: 'Notification deleted',
    data: [data],
  })
}

module.exports = controller;
