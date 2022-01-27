const express = require('express');
const router = express.Router();
const { tokenValidatorHandler } = require('../Middlewares/token.handler.js');
const { validatorHandler } = require('../Middlewares/validator.handler.js');
const { SelectProduct, InsertProduct, UpdateProduct } = require('../libs/joi/productsDTO.js');
const { ProductsService } = require('../services/Products.js');
const { accesHandler } = require('../Middlewares/access.handler.js');
const { permissionHandler } = require('../Middlewares/permission.handler.js');

const service = new ProductsService();

router.get('/',
    tokenValidatorHandler,
    accesHandler(1),
    validatorHandler(SelectProduct, 'query'),
    async (req, res) => {
        const result = await service.Select(req);
        res.status(result.status).json(result);
    }
);

router.post('/Insert',
    tokenValidatorHandler,
    permissionHandler(1),
    validatorHandler(InsertProduct, 'body'),
    async (req, res) => {
        const result = await service.Insert(req);
        res.status(result.status).json(result);
    }
);

router.post('/Update',
    tokenValidatorHandler,
    permissionHandler(1),
    validatorHandler(UpdateProduct, 'body'),
    async (req, res) => {
        const result = await service.Update(req);
        res.status(result.status).json(result);
    }
);

module.exports = router;