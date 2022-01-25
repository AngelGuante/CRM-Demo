const express = require('express');
const router = express.Router();
const { tokenValidatorHandler } = require('../Middlewares/token.handler.js');
const { validatorHandler } = require('../Middlewares/validator.handler.js');
const { InsertProduct, UpdateProduct } = require('../libs/joi/productsDTO.js');
const { ProductsService } = require('../services/Products.js');
const { permissionHandler } = require('../Middlewares/permission.handler.js');

const productsService = new ProductsService();

router.post('/Insert',
    tokenValidatorHandler,
    permissionHandler(1),
    validatorHandler(InsertProduct, 'body'),
    async (req, res) => {
        const productCreated = await productsService.Insert(req);
        res.status(productCreated.status).json(productCreated);
    }
);

router.post('/Update',
    tokenValidatorHandler,
    permissionHandler(2),
    validatorHandler(UpdateProduct, 'body'),
    async (req, res) => {
        const productUpdated = await productsService.Update(req);
        res.status(productUpdated.status).json(productUpdated);
    }
);

module.exports = router;