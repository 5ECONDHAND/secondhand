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
    !req.body.filename ||
    !req.body.size ||
    !req.body.mimetype
  ){
    return res.json({
      error: true,
      message: 'Please fill filename,size,mimetype',
      data: [],
    })
  }

  if(!req.isAdmin) {
    return res.json({
      error: true,
      message: 'Unauthorized access',
      data: [],
    })
  }

  const data = await prisma.storage.create({
    data: {
      filename: req.body.filename,
      size: req.body.size,
      mimetype: req.body.mimetype,
    }
  }).catch(err=>{
    return{
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
    message: 'Storage created',
    data: [data],
  })
}

module.exports= controller;
