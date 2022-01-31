const express = require('express');
const router = express.Router();
const { tokenValidatorHandler } = require('../Middlewares/token.handler.js');
const { validatorHandler } = require('../Middlewares/validator.handler.js');
const SellerContactService = require('../services/SellerContact.js');
const { DeleteSellerContact } = require('../libs/joi/sellerDTO.js');
const { permissionHandler } = require('../Middlewares/permission.handler.js');

const service = new SellerContactService();

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