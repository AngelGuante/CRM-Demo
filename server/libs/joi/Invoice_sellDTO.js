const Joi = require('joi');
const { products, status, amount } = require('./Utils/invoiceUtils.js');
const { UserCodeMaxLength } = require('../../Utils/staticsVariables.js');

const document = Joi.string().max(UserCodeMaxLength);

const InsertInvoiceSell = Joi.object({
    document: document.required(),
    products: products.required(),
    status: status.required(),
    amount: amount.required()
});

module.exports = { InsertInvoiceSell };