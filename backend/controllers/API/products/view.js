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
            error:true,
            message:"Invalid ID",
            data: [],
        })
    }

    const data = await prisma.product.findFirst({
        where:{
            id
        },
        include:{
            User: true,
            Photos: true,
            Categories: true,
            Photos: true,
        }.catch(err =>{
            return{
                error: true,
                message: err.message,
                data: [],
            }
        })
    })

    if(data && data.error){
        return res.json(data)
    }

    res.json({
        error: false,
        message: 'Success',
        data: [],
    })
}

module.exports = controller;