const Joi = require('Joi');
const { UserCodeMaxLength } = require('../../Utils/staticsVariables.js');
const { contactObjectCustomValidation } = require('./Utils/sellerCustomerUtils.js');

const offset = Joi.number().min(0);

const status = Joi.number().min(1).max(2);
const document = Joi.string().max(UserCodeMaxLength);
const name = Joi.string().max(30);
const lastname = Joi.string().max(30);

const contacts = Joi.array().custom(contactObjectCustomValidation);
const contact = Joi.number().min(1).max(9999999999);

const SelectCustomer = Joi.object({
    offset: offset.required(),
    document: document.allow(null, ''),
    name: name.allow(null, ''),
    lastname: lastname.allow(null, ''),
});

const InsertCustomer = Joi.object({
    document: document.required(),
    name: name.required(),
    lastname: lastname,

    contacts: contacts
});

const UpdateCustomer = Joi.object({
    status: status.required(),
    document: document.required(),
    name: name.required(),
    lastname: lastname.required(),
});

const SelectCustomerContact = Joi.object({
    document: document.required(),
});

const InsertCustomerContact = Joi.object({
    document: document.required(),

    contacts: contacts.required()
});

const DeleteSellerContact = Joi.object({
    document: document.required(),

    contact: contact.required()
});

module.exports = { SelectCustomer, InsertCustomer, UpdateCustomer, SelectCustomerContact, InsertCustomerContact, DeleteSellerContact }