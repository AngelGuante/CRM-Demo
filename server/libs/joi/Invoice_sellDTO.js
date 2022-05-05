const Joi = require('joi');
const { products, status, amount } = require('./Utils/invoiceUtils.js');
const { UserCodeMaxLength } = require('../../Utils/staticsVariables.js');

const document = Joi.string().max(UserCodeMaxLength);
const type = Joi.number().min(2).max(3);
const initial = Joi.number();
const creditamount = Joi.number();
const duesamount = Joi.number();
const duesquantity = Joi.number();
const duesprofit = Joi.number();

const InsertInvoiceSell = Joi.object({
    type: type.required(),
    document: document.required(),
    products: products.required(),
    status: status.required(),
    amount: amount.required(),

    initial: initial.when('type', { is: Joi.equal(3), then: Joi.required() }),
    creditamount: creditamount.when('type', { is: Joi.equal(3), then: Joi.required() }),
    duesamount: duesamount.when('type', { is: Joi.equal(3), then: Joi.required() }),
    duesquantity: duesquantity.when('type', { is: Joi.equal(3), then: Joi.required() }),
    duesprofit: duesprofit.when('type', { is: Joi.equal(3), then: Joi.required() })
});

module.exports = { InsertInvoiceSell };