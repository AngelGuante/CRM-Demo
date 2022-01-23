const Joi = require('joi');

// const status = Joi.number().min(1).max(2);
const type = Joi.number().min(1).max(2);
const code = Joi.string().max(20);
const description = Joi.string().max(50);

const cost = Joi.number().min(0);
const price = Joi.number();
// const quantity = Joi.number().min(0);

const InsertProduct = Joi.object({
    type: type.required(),
    code: code.required(),
    description: description.required(),

    cost: cost,
    price: price.when('cost', { is: Joi.exist(), then: Joi.number().greater(Joi.ref('cost')) })
});

module.exports = { InsertProduct };