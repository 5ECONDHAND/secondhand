const crypto = require('crypto');
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

  const hash = req.body.password
  ? crypto.createHash('sha512').update(req.body.password).digest('hex')
  : null;

  var dataPayload = {
    email: req.body.email,
    fullname: req.body.fullname,
    password: hash,
    phoneNo: req.body.phoneNo,
    city: req.body.city,
    address: req.body.address,
    updatedAt: new Date()
  };
  //remove key with null value
  dataPayload = Object.fromEntries(Object.entries(dataPayload).filter(([_, v]) => v != null));

  // photos update craft payload
  if(
    req.files != null
    && Array.isArray(req.files)
    && req.files.length > 0
  ) {
    dataPayload.Photos = {
      deleteMany: {},
      create: [{
        Storage: {
          create: {
            filename: req.files[0].filename,
            mimetype: req.files[0].mimetype,
            size: req.files[0].size
          }
        }
      }]
    };
  }

  const data = await prisma.user.update({
    where: {
      id
    },
    data: dataPayload
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
    message: 'User updated',
    data: [data],
  })
}

module.exports = controller;
