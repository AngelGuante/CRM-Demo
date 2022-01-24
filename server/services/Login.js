const { CompareHashPassword } = require('../libs/bcrypt.js');
const { signToken } = require('../libs/jwt.js');
const sequelize = require('../libs/sequelize');
const { SignedInUsers } = require('../Utils/staticsVariables.js');

class LoginService {
    async SignIn(req) {
        const data = req.body;
        const [user] = (await sequelize.query(`SELECT U.id, ES.name, C.companynumber, U.password, BO.id branch_office_id, R.id rol_id,
                                                    (SELECT string_agg(permission_id::text, ',')  permissions
                                                    FROM Role_Permission_Access 
                                                    WHERE role_id = R.id
                                                    GROUP BY role_id
                                                    ),
                                                    (SELECT string_agg(access_id::text, ',')  access
                                                    FROM Role_Permission_Access 
                                                    WHERE role_id = R.id
                                                    GROUP BY role_id
                                                    )
                                                    FROM "user" U
                                                    JOIN employee E ON E.id = U.employee_id
                                                    JOIN branch_office BO ON BO.id = E.branch_office_id
                                                    JOIN company C ON C.id = BO.company_id
                                                    JOIN employee_status ES ON ES.id = E.employee_status_id
												    JOIN Job J ON J.id = E.job_id
												    JOIN role R ON R.job_id = J.id
                                                    WHERE U.name = '${data.user.toLowerCase()}'
                                                    `))[0];

        if (user) {
            if (user['id'] !== 1)
                return `{"status": 401, "title": "${user['Name']}", "message": "${user[description]}"}`;
            else if (await CompareHashPassword(data.pass, user['password']) && data.companyNumber === user['companynumber']) {
                //Validate if de user are already Signed In.
                const itemExistsIndex = SignedInUsers.findIndex(x => x['id'] == user['id']);

                //If user already exists, remove old token.
                if (itemExistsIndex >= 0)
                    SignedInUsers.splice(itemExistsIndex, 1);

                //Token Payload
                const payload = {
                    sub: user['id'],
                };

                const token = signToken(payload);

                //Save user Signed
                SignedInUsers.push({
                    "id": user['id'],
                    "ip": req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                    "token": `Bearer ${token}`,
                    "branch_office": user['branch_office_id'],
                    "company_id": user['id'],
                    "rol_id": user['rol_id'],
                    "companyNumber": user['companynumber'],
                    "permissions": user['permissions'],
                    "access": user['access'],
                });

                return `{"status": 200, "title": "Success", "message": "${token}"}`;
            }
        }
        return;
    }
}

module.exports = { LoginService };