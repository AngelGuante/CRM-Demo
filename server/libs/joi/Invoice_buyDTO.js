const Joi = require('joi');
const { products, status, amount } = require('./Utils/invoiceUtils.js');
const { UserCodeMaxLength } = require('../../Utils/staticsVariables.js');

const code = Joi.string().max(UserCodeMaxLength);

const InsertInvoiceBuy = Joi.object({
    code: code.required(),
    products: products.required(),
    status: status.required(),
    amount: amount.required()
});

module.exports = { InsertInvoiceBuy };