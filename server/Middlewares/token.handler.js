const { validateToken } = require('../libs/jwt.js');

const tokenValidatorHandler = (req, res, next) => {
    if(validateToken(req.headers['authorization']))
        next();
    else 
        next(res.status(401).json(JSON.parse(`{"status": 401, "title": "Unauthorized", "message": "Unauthorized"}`)));
}

module.exports = { tokenValidatorHandler };