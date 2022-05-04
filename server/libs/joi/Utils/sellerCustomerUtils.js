//*********************
//*Customs validations*
//*********************

//Validate an array of constacts
const contactObjectCustomValidation = (value) => {
    const contactSize = 40;
    const contactTypeValidValues = 1;

    if (value.find(x => x['contact'].length > contactSize))
        throw new Error(`contact size must be less than ${contactSize} characters`);
    if (value.find(x => x['type'] < 0 || x['type'] > 1))
        throw new Error(`contact type must be between 0 and ${contactTypeValidValues}`);
    if (value.find(x => (!x.hasOwnProperty('contact'))
        || (!x.hasOwnProperty('type'))
        || x['contact'].trim().length === 0))
        throw new Error(`contact and type must be valids values`);

    //Validate if one contact with type 1 (numer) is not a number
    if (value.find(x => x['type'] === 1 && !x['contact'].match(/^\d*$/)))
        throw new Error(`contact type number must have only numbers`);

    return value;
}

module.exports = { contactObjectCustomValidation }