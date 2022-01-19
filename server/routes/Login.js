const { LoginService } = require('../services/Login.js');
const express = require('express');
const router = express.Router();
const { validatorHandler } = require('../Middlewares/validator.handler.js');
const { SendLoginCredentials } = require('../libs/joi/LoginDTO.js');

const loginService = new LoginService();

router.post('/Access',
    validatorHandler(SendLoginCredentials, 'body'),
    async (req, res) => {
        const logResult = await loginService.SignIn(req.body);
        if(logResult)
            res.send(logResult);
        else
            res.status(401).json(`{'status': 401, 'message': wrong credentials`);
});

module.exports = router;