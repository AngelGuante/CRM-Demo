const express = require('express');
const router = express.Router();
const { tokenValidatorHandler } = require('../Middlewares/token.handler.js');
const { validatorHandler } = require('../Middlewares/validator.handler.js');
const CustomerContactService = require('../services/CustomerContact.js');
const { SelectCustomerContact, InsertCustomerContact, DeleteSellerContact } = require('../libs/joi/customerDTO.js');
const { accesHandler } = require('../Middlewares/access.handler.js');
const { permissionHandler } = require('../Middlewares/permission.handler.js');

const service = new CustomerContactService();

router.get('/',
    tokenValidatorHandler,
    accesHandler(3),
    validatorHandler(SelectCustomerContact, 'query'),
    async (req, res) => {
        const result = await service.Select(req);
        res.status(result.status).json(result);
    }
);

router.post('/Insert',
    tokenValidatorHandler,
    accesHandler(3),
    permissionHandler(4),
    validatorHandler(InsertCustomerContact, 'body'),
    async (req, res) => {
        const result = await service.Insert(req);
        res.status(result.status).json(result);
    }
);

router.delete('/Delete',
    tokenValidatorHandler,
    accesHandler(3),
    permissionHandler(4),
    validatorHandler(DeleteSellerContact, 'body'),
    async (req, res) => {
        const result = await service.Delete(req);
        res.status(result.status).json(result);
    }
);

module.exports = router;