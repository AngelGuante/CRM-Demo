const express = require('express');
const router = express.Router();
const { tokenValidatorHandler } = require('../Middlewares/token.handler.js');
const { validatorHandler } = require('../Middlewares/validator.handler.js');
const SellerContactService = require('../services/SellerContact.js');
const { SelectSellerContact, InsertSellerContact, DeleteSellerContact } = require('../libs/joi/sellerDTO.js');
const { accesHandler } = require('../Middlewares/access.handler.js');
const { permissionHandler } = require('../Middlewares/permission.handler.js');

const service = new SellerContactService();

router.get('/',
    tokenValidatorHandler,
    accesHandler(2),
    validatorHandler(SelectSellerContact, 'query'),
    async (req, res) => {
        const result = await service.Select(req);
        res.status(result.status).json(result);
    }
);

router.post('/Insert',
    tokenValidatorHandler,
    permissionHandler(2),
    validatorHandler(InsertSellerContact, 'body'),
    async (req, res) => {
        const result = await service.Insert(req);
        res.status(result.status).json(result);
    }
);

router.delete('/Delete',
    tokenValidatorHandler,
    permissionHandler(2),
    validatorHandler(DeleteSellerContact, 'body'),
    async (req, res) => {
        const result = await service.Delete(req);
        res.status(result.status).json(result);
    }
);

module.exports = router;