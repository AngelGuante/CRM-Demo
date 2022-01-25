// Validate if the user has a permission
// *************************************

const { GetUserSigned } = require('../Utils/staticsMethods.js');

const permissionHandler = (permissionId) => {
    let permissionName = '';

    if (permissionId == 1)
        permissionName = 'insert producto'

    return (req, res, next) => {
        const permissions = (GetUserSigned(req))['permissions'];

        if (permissions.split(',').find(x => x === String(permissionId)))
            next();
        else
            next(res.status(401).json(JSON.parse(`{"status": 401, "title": "Unauthorized", "message": "You have no permission to: ${permissionName}" }`)));
    }
}

module.exports = { permissionHandler }