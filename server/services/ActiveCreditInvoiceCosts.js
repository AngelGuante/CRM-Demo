const { models } = require('../libs/sequelize.js');
const { MoneyToNumber } = require('../Utils/staticsMethods.js');

class ActiveCreditInvoiceCosts {
    async Insert(data) {
        let active_credit_invoice_costs = await models.active_credit_invoice_costs.findOne({
            where: {
                branch_office_id: data.branch_office_id
            },
        });

        if (!active_credit_invoice_costs) {
            active_credit_invoice_costs = await models.active_credit_invoice_costs.create({
                branch_office_id: data['branch_office_id'],
                amount: 0
            });
        }

        await active_credit_invoice_costs.update({
            amount: MoneyToNumber(active_credit_invoice_costs['dataValues']['amount']) + data['amount']
        });
    }
}

module.exports = { ActiveCreditInvoiceCosts }