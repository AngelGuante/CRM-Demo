const Joi = require('joi');
const { UserCodeMaxLength, ProductCodeMaxLength } = require('../../Utils/staticsVariables.js');

//Customs validations
//****************************
//Validate an array of Products
const contactObjectCustomValidation = (value) => {
    if (value.find(x => x['product'].length > ProductCodeMaxLength))
        throw new Error(`product size must be less than ${ProductCodeMaxLength} characters`);
    if (value.find(x => (!x.hasOwnProperty('product'))
        || (!x.hasOwnProperty('amount'))
        || (!x.hasOwnProperty('quantity'))
        || x['product'].length === 0
        || x['amount'].length === 0
        || x['quantity'].length === 0))
        throw new Error(`product, amount and quantity must be valids values`);

    //Validate if amount is not Money format and quantity is not number format
    if (value.find(x => !x['amount'].toString().match(/^\$[0-9]+(\.[0-9]{1,2})?$/)
        || !x['quantity'].toString().match(/^\d*$/)))
        throw new Error(`amount and quantity must have only numbers`);

    return value;
}

const amount = Joi.number();
const status = Joi.number().min(1).max(2);
const code = Joi.string().max(UserCodeMaxLength);
const products = Joi.array().custom(contactObjectCustomValidation);

const InsertInvoiceBuy = Joi.object({
    code: code.required(),
    products: products.required(),
    status: status.required(),
    amount: amount.required()
});

module.exports = { InsertInvoiceBuy };