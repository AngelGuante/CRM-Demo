const Joi = require('Joi');

//Customs validations
//****************************
//Validate an array of constacts
const contactObjectCustomValidation = (value) => {
    const contactSize = 40;
    const contactTypeValidValues = 1;

    if (value.find(x => x['contact'].length > contactSize))
        throw new Error(`contact size must be less than ${contactSize} characters`);
    if (value.find(x => x['type'] < 0 || x['type'] > 1))
        throw new Error(`contact type must be between 0 and ${contactTypeValidValues}`);
    if (value.find(x => (!x.hasOwnProperty('contact')) || (!x.hasOwnProperty('type'))))
        throw new Error(`contact and type must be valids values`);

    //Validate if one contact with type 1 (numer) is not a number
    if (value.find(x => x['type'] === 1 && !x['contact'].match(/^\d*$/)))
        throw new Error(`contact type number must have only numbers`);

    return value;
}

const offset = Joi.number().min(0);

const status = Joi.number().min(1).max(2);
const code = Joi.string().max(20);
const name = Joi.string().max(80);

const contacts = Joi.array().custom(contactObjectCustomValidation);
const contact = Joi.number().min(1).max(9999999999);

const SelectSeller = Joi.object({
    offset: offset.required(),
    code: code.allow(null, ''),
    name: name.allow(null, ''),
});

const InsertSeller = Joi.object({
    status: status.required(),
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