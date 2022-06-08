const express = require('express');
const router = express.Router();
const { tokenValidatorHandler } = require('../Middlewares/token.handler.js');
const { validatorHandler } = require('../Middlewares/validator.handler.js');
const SellerService = require('../services/Seller.js');
const { SelectSeller, InsertSeller, UpdateSeller } = require('../libs/joi/sellerDTO.js');
const { accesHandler } = require('../Middlewares/access.handler.js');
const { permissionHandler } = require('../Middlewares/permission.handler.js');

const service = new SellerService();

router.get('/',
    tokenValidatorHandler,
    accesHandler(4),
    permissionHandler(5),
    validatorHandler(SelectSeller, 'query'),
    async (req, res) => {
        const result = await service.Select(req);
        res.status(result.status).json(result);
    }
);

router.post('/Insert',
    tokenValidatorHandler,
    accesHandler(4),
    permissionHandler(2),
    validatorHandler(InsertSeller, 'body'),
    async (req, res) => {
        const result = await service.Insert(req);
        res.status(result.status).json(result);
    }
);

router.post('/Update',
    tokenValidatorHandler,
    accesHandler(4),
    permissionHandler(2),
    validatorHandler(UpdateSeller, 'body'),
    async (req, res) => {
        const result = await service.Update(req);
        res.status(result.status).json(result);
    }
);

module.exports = router;