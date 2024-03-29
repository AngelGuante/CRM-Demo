const { config } = require('../config/config.js');
const jwt = require('jsonwebtoken');

const signToken = payload =>
    jwt.sign(payload, config.jwtSecret);

const validateToken = token => {
    try{
        jwt.verify(token.replace('Bearer ', ''), config.jwtSecret);
        return true;
    }
    catch{
        return;
    }
}

const getTokenPayload = token => {
    try {
        return jwt.verify(token.replace('Bearer ', ''), config.jwtSecret);
    } catch{
        return;
    }
}

module.exports = { signToken, validateToken, getTokenPayload }