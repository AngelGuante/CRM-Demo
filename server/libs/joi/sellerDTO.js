const Joi = require('Joi');
const { UserCodeMaxLength } = require('../../Utils/staticsVariables.js');
const { contactObjectCustomValidation } = require('./Utils/sellerCustomerUtils.js');

const offset = Joi.number().min(0);

const status = Joi.number().min(1).max(2);
const code = Joi.string().max(UserCodeMaxLength);
const name = Joi.string().max(80);

const contacts = Joi.array().custom(contactObjectCustomValidation);
const contact = Joi.number().min(1).max(9999999999);

const SelectSeller = Joi.object({
    offset: offset,
    code: code.allow(null, ''),
    name: name.allow(null, ''),
});

const InsertSeller = Joi.object({
    code: code.required(),
    name: name.required(),

    contacts: contacts
});

const SelectSellerContact = Joi.object({
    code: code.required(),
});

const UpdateSeller = Joi.object({
    status: status.required(),
    code: code.required(),
    name: name.required(),
});

const InsertSellerContact = Joi.object({
    code: code.required(),

    contacts: contacts.required()
});

const DeleteSellerContact = Joi.object({
    code: code.required(),

    contact: contact.required()
});

module.exports = { SelectSeller, InsertSeller, UpdateSeller, SelectSellerContact, InsertSellerContact, DeleteSellerContact }