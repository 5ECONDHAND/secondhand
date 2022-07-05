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

  if(
    req.userId != id
    && !req.isAdmin
  ) {
    return res.json({
      error: true,
      message: 'Unauthorized access',
      data: [],
    })
  }

  const data = await prisma.user.findFirst({
    where: {
      id
    },
    include: {
      Transactions: true,
      Photos: {
        include: {
          Storage: true
        }
      },
      Notifications: true,
      Products: true
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
    message: 'Success',
    data: [data],
  })
}

module.exports = controller;
