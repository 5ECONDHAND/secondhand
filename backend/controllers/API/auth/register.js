const crypto = require('crypto');
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
    || !req.body.fullname
    || !req.body.password
  ) {
    return res.json({
      error: true,
      message: 'Please fill email, fullname, and password',
      data: [],
    })
  }

  const registeredUser = await prisma.user.findUnique({
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

  if(registeredUser && registeredUser.error){
    return res.json(registeredUser)
  }

  if(
    registeredUser
    && registeredUser.email == req.body.email
  ) {
    return res.json({
      error: true,
      message: 'Email already exists',
      data: [],
    })
  }

  const hash = crypto.createHash('sha512').update(req.body.password).digest('hex');

  const data = await prisma.user.create({
    data: {
      email: req.body.email,
      fullname: req.body.fullname,
      password: hash,
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
    data: [data],
  });
}

module.exports = controller;
