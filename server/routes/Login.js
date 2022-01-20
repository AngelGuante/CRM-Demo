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
        
        if(logResult){
            const logResultJSON = JSON.parse(logResult);

            if(logResultJSON['status'] === 200)
               res.status(200).send(logResultJSON);
            else
                res.status(401).json(logResultJSON);
        }
        else
            res.status(401).json(JSON.parse(`{"status": 401, "title": "Wrong Credentials", "message": "Wrong Credentials"}`));
    });

module.exports = router;