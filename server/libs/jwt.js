const { config } = require('../config/config');
const jwt = require('jsonwebtoken');

const signToken = payload => {
    return jwt.sign(payload, config.jwtSecret);
}

const validateToken = token => {
    return jwt.verify(token, config.jwtSecret);
}

module.exports = { signToken, validateToken }