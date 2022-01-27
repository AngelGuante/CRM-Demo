const Joi = require('Joi');

const offset = Joi.number().min(0);

const status = Joi.number().min(1).max(2);
const code = Joi.string().max(20);
const name = Joi.string().max(80);

const contact = Joi.string().max(40);
const contact_type = Joi.number().min(1).max(1);

const SelectSeller = Joi.object({
    offset: offset.required(),
    code: code.allow(null, ''),
    name: name.allow(null, ''),
});

const InsertSeller = Joi.object({
    status: status.required(),
    code: code.required(),
    name: name.required(),

    contact: contact,
    contact_type: contact_type.when('contact', { is: Joi.exist(), then: Joi.required() }),
});

module.exports = { SelectSeller, InsertSeller }