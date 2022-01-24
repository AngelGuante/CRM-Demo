// Validate if the user has a permission
// *************************************

const { getTokenPayload } = require('../libs/jwt.js');
const { SignedInUsers } = require('../Utils/staticsVariables.js');

const permissionHandler = (permissionId) => {
    let permissionName = '';

    if (permissionId == 1)
        permissionName = 'insert producto'

    return (req, res, next) => {
        const requestUserId = (getTokenPayload(req.headers['authorization']))['sub'];
        const permissions = (SignedInUsers.find(x => x['id'] === requestUserId))['permissions'];

        if (permissions.split(',').find(x => x === String(permissionId)))
            next();
        else
            next(res.status(401).json(JSON.parse(`{"status": 401, "title": "Unauthorized", "message": "You have no permission to: ${permissionName}" }`)));
    }
}

module.exports = { permissionHandler }