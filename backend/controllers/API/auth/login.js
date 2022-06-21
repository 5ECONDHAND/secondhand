const express = require('express')
/** @type {import('../../../models/instance')} */
const prisma = require(process.env.ROOT_PATH + '/models/instance');
const app = express()
const dotenv = require('dotenv');
dotenv.config();
const createError = require('http-errors');
const bcrypt = require('bcrypt')

const jwt = require('./jwt');
const controller = require('./register');

app.use(express.json())


async function login(req, res, next){
    var email = req.body.email;
    var password = req.body.password;

    const user = await prisma.user.findUnique({
        where :{
            email
        },
    })

    if(!user){
        throw createError.NotFound('User not registered');
    }
    
    const checkPassword = bcrypt.compareSync(password, user.password)
    if (!checkPassword) throw createError.Unauthorized('Email address or password not valid')
    delete user.password
    const accessToken = await jwt.signAccessToken(user)
    // return { ...user, accessToken }

    res.json({
        error: false,
        message: "Success",
        data : {
            user : user,
            accessToken : accessToken,
        },
    });
    
}

module.exports = login;