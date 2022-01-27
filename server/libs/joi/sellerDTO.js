const Joi = require('Joi');

const status = Joi.number().min(1).max(2);
const code = Joi.string().max(20);
const name = Joi.string().max(80);

const InsertSeller = Joi.object({
    status: status.required(),
    code: code.required(),
    name: name.required(),
});

module.exports = { InsertSeller }