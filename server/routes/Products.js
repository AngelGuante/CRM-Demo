const express = require('express');
const router = express.Router();
const { tokenValidatorHandler } = require('../Middlewares/token.handler.js');
const { validatorHandler } = require('../Middlewares/validator.handler.js');
const { InsertProduct } = require('../libs/joi/productsDTO.js');
const { ProductsService } = require('../services/Products.js');
const { accesHandler } = require('../Middlewares/access.handler.js');

const productsService = new ProductsService();

router.post('/Insert',
    tokenValidatorHandler,
    accesHandler(1),
    validatorHandler(InsertProduct, 'body'),
    async (req, res) => {
        const productCreated = await productsService.Insert(req);
        res.status(productCreated.status).json(productCreated);
    }
);

module.exports = router;