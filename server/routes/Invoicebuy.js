const express = require('express');
const router = express.Router();
const { tokenValidatorHandler } = require('../Middlewares/token.handler.js');
const { validatorHandler } = require('../Middlewares/validator.handler.js');
const SellerService = require('../services/Invoicebuy.js');
const { InsertInvoiceBuy } = require('../libs/joi/Invoice_buyDTO');
//Access
//Permissions

const service = new SellerService();

router.post('/Insert',
    // tokenValidatorHandler,
    // permissionHandler(2),
    validatorHandler(InsertInvoiceBuy, 'body'),
    async (req, res) => {
        const result = await service.Insert(req);
        res.status(result.status).json(result);
    }
);

module.exports = router;