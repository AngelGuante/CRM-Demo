// Validate if the user has access resouce/ page

const { getTokenPayload } = require('../libs/jwt.js');
const { SignedInUsers } = require('../Utils/staticsVariables.js');

const accesHandler = (accessId) => {
    let accessName = '';

    if(accessId == 1)
        accessName = 'products'

    return (req, res, next) => {
        const requestUserId = (getTokenPayload(req.headers['authorization']))['sub'];
        const access = (SignedInUsers.find(x => x['id'] === requestUserId))['access'];

        if(access.split(',').find(x => x === String(accessId)))
            next();
        else
            next(res.status(401).json(JSON.parse(`{"status": 401, "title": "Unauthorized", "message": "You have no access to ${accessName} rosource" }`)));
    }
}

module.exports = { accesHandler }