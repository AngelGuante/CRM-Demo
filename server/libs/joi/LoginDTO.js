const Joi = require('joi');

const companyNumber = Joi.number();
const user = Joi.string();
const pass = Joi.string();

const SendLoginCredentials = Joi.object({
    companyNumber: companyNumber.required(),
    user: user.required(),
    pass: pass.required()
});

module.exports = { SendLoginCredentials };