/** @type {import('../../../models/instance')} */
const prisma = require(process.env.ROOT_PATH + '/models/instance');

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */

async function controller(req, res, next){
  const data = await prisma.transaction.findMany({
    include: {
      Product: {
        select: {
          id: true,
          name: true,
          status: true,
          price: true,
          description: true,
          createdAt: true,
          updatedAt: true,
          Photos: true
        }
      },
      Users: {
        select: {
          accepted: true,
          offeredPrice: true,
          description: true,
          User: {
            select: {
              id: true,
              phoneNo: true,
              fullname: true,
              email: true,
              city: true,
              address: true,
              Photos: true,
            }
          },
          createdAt: true
        }
      }
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
