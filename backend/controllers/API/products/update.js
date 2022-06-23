/** @type {import('../../../models/instance')} */
const prisma = require(process.env.ROOT_PATH + '/models/instance');

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */

async function controller(req, res, next){
    var id = parseInt(req.params.id);

    if(isNaN(id)){
        return res.json({
            error: true,
            message: "Invalid ID",
            data: [],
        })
    }

    var dataPayload = {
        updatedAt: new Date(),
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        User:{
            connect:{
                id: req.userId,
            }
        },
    };

    //remove key with null value
    dataPayload = Object.fromEntries(Object.entries(dataPayload).filter(([_, v]) => v != null));

    const data = await prisma.product.update({
        where:{
            id
        },
        data: dataPayload
    }).catch(err=>{
        return{
            error: true,
            message: err.message,
            data:[]
        }
    });

    if(data && data.error){
        return res.json(data)
    }

    req.json({
        error: false,
        message: "Product Updated",
        data: [data],
    })
}

module.exports = controller;