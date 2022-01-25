const Joi = require('joi');

const companyNumber = Joi.number();
const user = Joi.string().max(15);
const pass = Joi.string().max(60);

const SendLoginCredentials = Joi.object({
    companyNumber: companyNumber.required(),
    user: user.required(),
    pass: pass.required()
});

module.exports = { SendLoginCredentials };