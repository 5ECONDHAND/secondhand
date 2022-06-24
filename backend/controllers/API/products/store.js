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
        !req.body.name 
        || !req.body.price
        || !req.body.description
    ){
        return res.json({
            error: true,
            message: 'Please enter product details',
            data:[],
        })
    }

    const data = await prisma.product.create({
        data:{
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
        }
    }).catch(err => {
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
        message: 'Product Created',
        data: [data],
    })
}

module.exports = controller