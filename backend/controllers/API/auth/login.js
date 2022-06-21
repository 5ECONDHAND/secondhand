const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
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
    !req.body.email
    || !req.body.password
  ) {
    return res.json({
      error: true,
      message: 'Please fill email and password',
      data: [],
    })
  }

  const data = await prisma.user.findUnique({
    where :{
      email: req.body.email
    },
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

  const hash = crypto.createHash('sha512').update(req.body.password).digest('hex');

  if(
    !data
    || data == null
    || data.password != hash
  ) {
    return res.json({
      error: true,
      message: 'Username or password is incorrect',
      data: [],
    })
  }

  const jwtPayload = {
    loggedIn: true,
    userId: data.id
  };
  const jwtResult = jwt.sign(jwtPayload, jwtSecret, { expiresIn: '7d' });

  if(!jwtResult){
    return res.json({
      error: true,
      message: 'Failed to sign JWT',
      data: [],
    })
  }

  res.json({
    error: false,
    message: "Success",
    data : [{
      ...data,
      accessToken: jwtResult,
    }],
  });

}

module.exports = controller;
