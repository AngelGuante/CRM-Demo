const { validateToken } = require('../libs/jwt.js');

const tokenValidatorHandler = (req, res, next) => {
    if(validateToken(req.headers['authorization']))
        next();
    else 
        next(res.status(401).json(`{"status": 401, "title": "unauthorized", "message": "unauthorized"`));
}

module.exports = { tokenValidatorHandler };