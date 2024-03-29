const express = require('express');
const router = express.Router();
const { tokenValidatorHandler } = require('../Middlewares/token.handler.js');
const { validatorHandler } = require('../Middlewares/validator.handler.js');
const { periodTransactionValidationhandler } = require('../Middlewares/periodTransactionValidation.handler');
const InvoiceBuyService = require('../services/Invoicebuy.js');
const { InsertInvoiceBuy } = require('../libs/joi/Invoice_buyDTO');
const { permissionHandler } = require('../Middlewares/permission.handler.js');

const service = new InvoiceBuyService();

router.post('/Insert',
    tokenValidatorHandler,
    permissionHandler(2),
    periodTransactionValidationhandler,
    validatorHandler(InsertInvoiceBuy, 'body'),
    async (req, res) => {
        const result = await service.Insert(req);
        res.status(result.status).json(result);
    }
);

module.exports = router;