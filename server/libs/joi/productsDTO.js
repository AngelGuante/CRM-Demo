const Joi = require('joi');

const status = Joi.number().min(1).max(2);
const type = Joi.number().min(1).max(2);
const code = Joi.string().max(20);
const description = Joi.string().max(50);

const cost = Joi.number().min(0);
const price = Joi.number().min(0);
// const quantity = Joi.number().min(0);

const InsertProduct = Joi.object({
    status: status.required(),
    type: type.required(),
    code: code.required(),
    description: description.required(),
    
    // cost: cost,
    // price: Joi.when('cost', { is: valid(true), then: Joi.boolean().only(true).required(), otherwise: Joi.forbidden() }),
});

module.exports = { InsertProduct };