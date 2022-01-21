const { validateToken } = require('../libs/jwt.js');
const { SignedInUsers } = require('../Utils/staticsVariables.js');

const tokenValidatorHandler = (req, res, next) => {
    const token = req.headers['authorization'];

    if(validateToken(token) && SignedInUsers.find(x => x["token"] == token))
        next();
    else 
        next(res.status(401).json(JSON.parse(`{"status": 401, "title": "Unauthorized", "message": "Unauthorized"}`)));
}

module.exports = { tokenValidatorHandler };