const { models } = require('../libs/sequelize.js');

class PeriodTransaction {
    // Validate if a transaction can be created
    async Validate(data) {
        const lastPeriodTransaction = await models.period_transaction.findOne({
            order: [['id', 'DESC']],
            limit: 1,
            offset: 0,
            attributes: ['createdat'],
            where: {
                branch_office_id: data.branch_office
            }
        });

        if (lastPeriodTransaction && lastPeriodTransaction['dataValues']['createdat'] <= new Date().toISOString().substring(0, 10))
            return true;

        return false;
    }
}

module.exports = { PeriodTransaction }