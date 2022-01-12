const express = require('express');
const router = express.Router();
const { validatorHandler } = require('../Middlewares/validator.handler.js');
const { SendLoginCredentials } = require('../libs/joi/LoginDTO.js');

router.post('/Access',
    validatorHandler(SendLoginCredentials, 'body'),
    (req, res) => {
        const body = req.body;
        res.send(body);
});

module.exports = router;