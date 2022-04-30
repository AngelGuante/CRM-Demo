
//                 Validate if transaction can be created
//********************************************************************** */

const { GetUserSigned } = require('../Utils/staticsMethods.js');
const { PeriodTransaction } = require('../services/PeriodTransaction.js');

const periodTransaction = new PeriodTransaction();

const periodTransactionValidationhandler = async (req, res, next) => {
    const userSigned = GetUserSigned(req);

    const invalid = await periodTransaction.Validate({
        branch_office: userSigned['branch_office']
    });

    if (invalid)
        next();
    else
        next(res.status(409).json(JSON.parse(`{"status": 409, "Conflict": "Unauthorized", "message": "Conflict to create transaction"}`)));
}

module.exports = { periodTransactionValidationhandler };