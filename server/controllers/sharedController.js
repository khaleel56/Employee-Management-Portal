const jwt = require('jsonwebtoken');
const { response } = require('../router');

const TOKEN_PRIVATE_KEY = process.env.TOKEN_PRIVATE_KEY;
const TOKEN_EXPIRATION_TIME = process.env.TOKEN_EXPIRATION_TIME;

exports.generateToken = ()=>{
    const token = jwt.sign({userId:userId.toString()}, TOKEN_PRIVATE_KEY, {
        expiresIn: TOKEN_EXPIRATION_TIME,
    })
    return token;
}