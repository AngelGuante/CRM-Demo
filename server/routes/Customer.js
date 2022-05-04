const express = require('express');
const router = express.Router();
const { tokenValidatorHandler } = require('../Middlewares/token.handler.js');
const { accesHandler } = require('../Middlewares/access.handler.js');
const { permissionHandler } = require('../Middlewares/permission.handler.js');
const { validatorHandler } = require('../Middlewares/validator.handler.js');
const { SelectCustomer, InsertCustomer, UpdateCustomer } = require('../libs/joi/customerDTO.js');
const CustomerService = require('../services/Customer.js');

const service = new CustomerService();

router.get('/',
    tokenValidatorHandler,
    accesHandler(3),
    validatorHandler(SelectCustomer, 'query'),
    async (req, res) => {
        const result = await service.Select(req);
        res.status(result.status).json(result);
    }
);

router.post('/Insert',
    tokenValidatorHandler,
    accesHandler(3),
    permissionHandler(4),
    validatorHandler(InsertCustomer, 'body'),
    async (req, res) => {
        const result = await service.Insert(req);
        res.status(result.status).json(result);
    }
);

router.post('/Update',
    tokenValidatorHandler,
    accesHandler(3),
    permissionHandler(4),
    validatorHandler(UpdateCustomer, 'body'),
    async (req, res) => {
        const result = await service.Update(req);
        res.status(result.status).json(result);
    }
);

module.exports = router;