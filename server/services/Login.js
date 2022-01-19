const { signToken } = require('../libs/jwt.js');
const { models } = require('../libs/sequelize');

class LoginService {
    async SignIn(data) {
        const user = await models.user.findOne({
            where: { name : data.user },
            include: [ { model: models.employee, as: 'employee',
                include: [ { model: models.branch_office, as: 'branch_office',
                    include: [ { model: models.business_branch_office, as: 'business_branch_office' } ]
                } ]
            } ],
        });

        // console.log(user);

        if(user.password == data.pass) {
            const payload = {
                sub: user.id,
                role: 'Demo Role'
            };
            return signToken(payload);
        }
        return;
    }
}

module.exports = { LoginService };