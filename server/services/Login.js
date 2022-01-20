const { CompareHashPassword } = require('../libs/bcrypt.js');
const { signToken } = require('../libs/jwt.js');
const { models } = require('../libs/sequelize');

class LoginService {
    async SignIn(data) {
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
                } ], attributes: ["name", "password"]
        });

        if(user) {
            if(user.employee.employee_status.id !== 1)
                return `{"status": 401, "title": "${user.employee.employee_status.Name}", "message": "${user.employee.employee_status.description}"}`;
            else if(await CompareHashPassword(data.pass, user.password) && data.companyNumber === user.employee.branch_office.company.companynumber) {
                const payload = {
                    sub: user.id,
                    role: "Demo Role"
                };
                return `{"status": 200, "title": "Success", "message": "${signToken(payload)}"}`;
            }
        }
        return;
    }
}

module.exports = { LoginService };