/** @type {import('../../../models/instance')} */
const prisma = require(process.env.ROOT_PATH + '/models/instance');

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */

async function controller(req, res, next){
  const data = await prisma.category.findMany({
    include: {
      Products: true
    }
  }).catch(err =>{
    return{
      error: true,
      message: err.message,
      data : [],
    }
  });

  if(data && data.error){
    return res.json(data)
  }

  res.json({
    error: false,
    message: "Success",
    data
  });
}

module.exports = controller;
