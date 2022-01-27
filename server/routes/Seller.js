const express = require('express');
const router = express.Router();
const { tokenValidatorHandler } = require('../Middlewares/token.handler.js');
const { validatorHandler } = require('../Middlewares/validator.handler.js');
const SellerService = require('../services/Seller.js');
const { SelectSeller, InsertSeller } = require('../libs/joi/sellerDTO.js');
const { accesHandler } = require('../Middlewares/access.handler.js');
const { permissionHandler } = require('../Middlewares/permission.handler.js');

const service = new SellerService();

router.get('/',
    tokenValidatorHandler,
    accesHandler(2),
    validatorHandler(SelectSeller, 'query'),
    async (req, res) => {
        const result = await service.Select(req);
        res.status(result.status).json(result);
    }
);

router.post('/Insert',
    tokenValidatorHandler,
    permissionHandler(2),
    validatorHandler(InsertSeller, 'body'),
    async (req, res) => {
        const result = await service.Insert(req);
        res.status(result.status).json(result);
    });

module.exports = router;