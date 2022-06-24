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
    !req.body.productId || !req.body.status
  ){
    return res.json({
      error: true,
      message: 'Please fill field',
      data: [],
    })
  }

  const data = await prisma.transaction.create({
    data:{
      productId: req.body.productId,
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
    message: 'Transaksi created',
    data: [data],
  })
}

module.exports= controller;
