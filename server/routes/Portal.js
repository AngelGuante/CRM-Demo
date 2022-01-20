const express = require('express');
const router = express.Router();
const { tokenValidatorHandler } = require('../Middlewares/token.handler.js');

router.get('/',
    tokenValidatorHandler,
    (req, res) => {
        res.status(200).send('/Portal');
    });

module.exports = router;