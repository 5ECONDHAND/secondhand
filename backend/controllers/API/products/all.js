/** @type {import('../../../models/instance')} */
const prisma = require(process.env.ROOT_PATH + "/models/instance");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function controller(req, res, next) {
  const data = await prisma.product.findMany({
<<<<<<< HEAD
=======
    take: req.query.take,
    orderBy:{
        name: req.query.orderBy
    },
>>>>>>> 4d429312262c1e44d46e066a048aa8b6c44934c3
    include: {
      User: {
        select: {
          id: true,
          phoneNo: true,
          fullname: true,
          email: true,
<<<<<<< HEAD
          city: true,
=======
>>>>>>> 4d429312262c1e44d46e066a048aa8b6c44934c3
          Photos: true,
          createdAt: true,
          updatedAt: true
        }
      },
      Photos: true,
<<<<<<< HEAD
      Categories: {
        'include': {
          'Category': true
        }
      },
=======
      Categories: true,
>>>>>>> 4d429312262c1e44d46e066a048aa8b6c44934c3
      Transaction: true
    },
  }).catch((err) => {
    return {
      error: true,
      message: err.message,
      data: [],
    };
  });

  if (data && data.error) {
    return res.json(data);
  }
<<<<<<< HEAD

  res.json({
    error: false,
    message: "Success",
    data,
  });
=======

  res.json({
    error: false,
    message: "Success",
    data,
  });

>>>>>>> 4d429312262c1e44d46e066a048aa8b6c44934c3
}

module.exports = controller;
