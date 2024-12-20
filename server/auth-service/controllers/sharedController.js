const jwt = require('jsonwebtoken');
// const { response } = require('../router');

exports.generateToken = (input)=>{

    const {userId} = input
    const token = jwt.sign({userId:userId}, process.env.TOKEN_PRIVATE_KEY, 
    // {        expiresIn: process.env.TOKEN_EXPIRATION_TIME    }
    )
    return token;
}

exports.verifyToken = (token)=>{
        const decoded = jwt.verify(token, process.env.TOKEN_PRIVATE_KEY)
        return decoded;
}