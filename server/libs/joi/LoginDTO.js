const Joi = require('joi');

const businessNumber = Joi.number();
const user = Joi.string();
const pass = Joi.string();

const SendLoginCredentials = Joi.object({
    businessNumber: businessNumber.required(),
    user: user.required(),
    pass: pass.required()
});

module.exports = { SendLoginCredentials };