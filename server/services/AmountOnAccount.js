const { models } = require('../libs/sequelize.js');
const { MoneyToNumber } = require('../Utils/staticsMethods.js');

class AmountOnAccountService {
    async Insert(data) {
        const amount_on_account = await models.branch_office_amount_on_account.findOne({
            attributes: [],
            where: {
                branch_office_id: data.branch_office_id
            },
            include: [
                {
                    model: models.amount_on_account, as: 'amount_on_account',
                    include: [
                        {
                            model: models.account_type, as: 'account_type',
                            attributes: [],
                            where: {
                                id: 1
                            }
                        }
                    ]
                }
            ]
        });

        await amount_on_account['dataValues']['amount_on_account'].update({
            amount: MoneyToNumber(amount_on_account['dataValues']['amount_on_account']['dataValues']['amount']) + data.amount
        });
    }
}

module.exports = { AmountOnAccountService }