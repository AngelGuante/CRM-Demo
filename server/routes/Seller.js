const express = require('express');
const router = express.Router();
const { tokenValidatorHandler } = require('../Middlewares/token.handler.js');
const { validatorHandler } = require('../Middlewares/validator.handler.js');
const SellerService = require('../services/Seller.js');
const { InsertSeller } = require('../libs/joi/sellerDTO.js');
const { permissionHandler } = require('../Middlewares/permission.handler.js');

const service = new SellerService();

router.post('/Insert',
    tokenValidatorHandler,
    permissionHandler(2),
    validatorHandler(InsertSeller, 'body'),
    async (req, res) => {
        const result = await service.Insert(req);
        res.status(result.status).json(result);
    });

module.exports = router;