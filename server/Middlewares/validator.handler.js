const validatorHandler = (schema, property) => {
    return (req, res, next) => {
        const data = req[property];
        const { error } = schema.validate(data, { abortEarly: false });
        if(error)
            next(res.status(400).json(`{'status': 400, 'message': ${error}`));
        next();
    };
}

module.exports = { validatorHandler };