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
  if(
    !req.body.email
    || !req.body.fullname
    || !req.body.password
  ) {
    return res.json({
      error: true,
      message: 'Please fill email, fullname, and password',
      data: [],
    })
  }

  if(
    !req.isAdmin
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

  const dataPayload = {
    email: req.body.email,
    fullname: req.body.fullname,
    password: hash
  }

  if(
    req.files != null
    && Array.isArray(req.files)
    && req.files.length > 0
  ) {
    dataPayload.Photos = {
      create: [{
        Storage: {
          create: {
            filename: req.files[0].filename || req.files[0].key,
            mimetype: req.files[0].mimetype,
            size: req.files[0].size
          }
        }
      }]
    };
  }

  const data = await prisma.user.create({
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
    message: 'User created',
    data: [data],
  })
}

module.exports = controller;
