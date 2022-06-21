const crypto = require('crypto');
/** @type {import('../../models/instance')} */
const prisma = require(process.env.ROOT_PATH + '/models/instance');

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
 const dotenv = require('dotenv');
 dotenv.config();
 const bcrypt = require('bcrypt');

 const jwt = require('./jwt');

 async function controller(req, res, next) {
    var email = req.body.email;
    var fullname = req.body.fullname;
    var password = req.body.password;
    
    newpassword = bcrypt.hashSync(password, 8);
    
    const user = await prisma.user.create({
        data :{
            email : email,
            fullname : fullname,
            password : newpassword,
        }
    })
    
    // user.accessToken = await jwt.signAccessToken(user);
    // return user;
    res.json({
        error: false,
        message: "Success",
        data : user,
      });
  }
  
  module.exports = controller;
