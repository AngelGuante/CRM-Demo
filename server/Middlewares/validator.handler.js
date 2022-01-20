const { string } = require("joi");

const validatorHandler = (schema, property) => {
    return (req, res, next) => {
        const data = req[property];
        const { error } = schema.validate(data, { abortEarly: false });
        if(error)
            next(res.status(400).json(JSON.parse(`{"status": 400, "title": "Bad Request", "message": "${(String(error)).replaceAll('"', '\'')}" }`)));
        next();
    };
}

module.exports = { validatorHandler };