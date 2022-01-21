const login = require('./Login.js');
const Products = require('./Products');

const setRoutes = express => {
    express.use('/Api/Login', login);
    express.use('/Api/Products', Products);
}

module.exports = setRoutes;