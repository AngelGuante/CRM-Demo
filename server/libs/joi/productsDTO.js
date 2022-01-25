const Joi = require('joi');

const offset = Joi.number().min(0);

const status = Joi.number().min(1).max(2);
const type = Joi.number().min(1).max(2);
const code = Joi.string().max(20);
const description = Joi.string().max(50);

const branch_office_id = Joi.number().min(0);
const cost = Joi.number().min(0);
const price = Joi.number();

const SelectProduct = Joi.object({
    offset: offset.required(),
    code: code.allow(null, ''),
    description: description.allow(null, ''),
});

const InsertProduct = Joi.object({
    type: type.required(),
    code: code.required(),
    description: description.required(),

    cost: cost,
    price: price.when('cost', { is: Joi.exist(), then: Joi.number().greater(Joi.ref('cost')) })
});

const UpdateProduct = Joi.object({
    status : status.required(),
    type: type.required(),
    code: code.required(),
    description: description.required(),

    branch_office_id: branch_office_id.required(),
    cost: cost.required(),
    price: price.required().when('cost', { is: Joi.exist(), then: Joi.number().greater(Joi.ref('cost')) })
});

module.exports = { SelectProduct, InsertProduct, UpdateProduct };