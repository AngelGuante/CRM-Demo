const express = require('express');
const router = express.Router();
const { tokenValidatorHandler } = require('../Middlewares/token.handler.js');
const { accesHandler } = require('../Middlewares/access.handler.js');
const { permissionHandler } = require('../Middlewares/permission.handler.js');
const { periodTransactionValidationhandler } = require('../Middlewares/periodTransactionValidation.handler');
const { validatorHandler } = require('../Middlewares/validator.handler.js');
const { InsertInvoiceSell } = require('../libs/joi/Invoice_sellDTO.js');
// const SellerService = require('../services/Invoicebuy.js');

// const service = new SellerService();

router.post('/Insert',
    tokenValidatorHandler,
    accesHandler(3),
    permissionHandler(4),
    periodTransactionValidationhandler,
    validatorHandler(InsertInvoiceSell, 'body'),
    async (req, res) => {
        return res.json({'result':'done!'})
        // const result = await service.Insert(req);
        // res.status(result.status).json(result);
    }
);

module.exports = router;