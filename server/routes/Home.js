const express = require('express');
const router = express.Router();
const { tokenValidatorHandler } = require('../Middlewares/token.handler.js');

router.get('/',
    tokenValidatorHandler,
    async (req, res) => {
        res.status(200).json({'ok': 200});
    }
);

module.exports = router;