// Validate if the user has access to resouce/ page
// ************************************************

const { GetUserSigned } = require('../Utils/staticsMethods.js');

const accesHandler = (accessId) => {
    let accessName = '';

    if (accessId == 1)
        accessName = 'products'

    return (req, res, next) => {
        const access = (GetUserSigned(req))['access'];

        if (access.split(',').find(x => x === String(accessId)))
            next();
        else
            next(res.status(401).json(JSON.parse(`{"status": 401, "title": "Unauthorized", "message": "You have no access to rosource: ${accessName}" }`)));
    }
}

module.exports = { accesHandler }