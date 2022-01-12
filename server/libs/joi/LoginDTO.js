const Joi = require('joi');

const user = Joi.string();
const pass = Joi.string();

const SendLoginCredentials = Joi.object({
    user: user.required(),
    pass: pass.required()
});

module.exports = { SendLoginCredentials };