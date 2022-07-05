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

  // get user by id
  if (req.userId) {
    wherePayload = {
      where: {
        id: req.userId
      }
    };
  }

  // bypass if admin
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

  const data = await prisma.user.findMany({
    ...wherePayload,
    include: {
      Transactions: true,
      Photos: true,
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
    message: "Success",
    data,
  });
}

module.exports = controller;
