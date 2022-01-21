const { CompareHashPassword } = require('../libs/bcrypt.js');
const { signToken } = require('../libs/jwt.js');
const { models } = require('../libs/sequelize');
const { SignedInUsers } = require('../Utils/staticsVariables.js');

class LoginService {
    async SignIn(req) {
        const data = req.body;
        const user = await models.user.findOne({
            where: { name : data.user.toLowerCase() },
            include: [ {
                model: models.employee, as: "employee",
                    include: [ { 
                        model: models.branch_office, as: "branch_office",
                            include: [ {
                                model: models.company, as: "company"
                            } ],
                    },
                    {
                        model: models.employee_status, as: "employee_status"
                    } ], attributes: ["branch_office_id"],
                } ], attributes: ["id", "name", "password"]
        });

        if(user) {
            if(user.employee.employee_status.id !== 1)
                return `{"status": 401, "title": "${user.employee.employee_status.Name}", "message": "${user.employee.employee_status.description}"}`;
            else if(await CompareHashPassword(data.pass, user.password) && data.companyNumber === user.employee.branch_office.company.companynumber) {
                //Validate if de user are already Signed In.
                const itemExistsIndex = SignedInUsers.findIndex(x => x['id'] == user.id);

                //If user already exists, remove old token.
                if(itemExistsIndex >= 0)
                    SignedInUsers.splice(itemExistsIndex, 1);

                //Token Payload
                const payload = {
                    sub: user.id,
                    role: "Demo Role"
                };

                const token = signToken(payload);

                //Save user Signed
                SignedInUsers.push({
                    "id": user.id,
                    "ip": req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                    "token": `Bearer ${token}`,
                    "branch_office": user.employee.branch_office_id,
                    "company_id": user.employee.branch_office.company.id,
                    "companyNumber": user.employee.branch_office.company.companynumber
                });

                return `{"status": 200, "title": "Success", "message": "${token}"}`;
            }
        }
        return;
    }
}

module.exports = { LoginService };