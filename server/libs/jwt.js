const { config } = require('../config/config.js');
const jwt = require('jsonwebtoken');
const { SignedInUsers } = require('../Utils/staticsVariables.js');

const signToken = payload => {
    return jwt.sign(payload, config.jwtSecret);
}

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