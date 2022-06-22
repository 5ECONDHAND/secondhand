/** @type {import('../../../models/instance')} */
const prisma = require(process.env.ROOT_PATH + '/models/instance');

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function controller(req, res, next) {
  if(
    !req.body.data
  ) {
    return res.json({
      error: true,
      message: 'Please fill data',
      data: [],
    })
  }

  try {
    var parsed = JSON.parse(req.body.data);
    var stringify = JSON.stringify(parsed);
  } catch(e) {
    return res.json({
      error: true,
      message: e.toString(),
      data: [],
    })
  }

  const data = await prisma.notification.create({
    data: {
      data: stringify,
      User: {
        connect: {
          //id: req.userId we dont have authorization middleware yet
          id: 1
        }
      }
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
    message: 'Notification created',
    data: [data],
  })
}

module.exports = controller;
