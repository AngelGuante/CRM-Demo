const login = require('./Login.js');
const Products = require('./Products.js');
const Seller = require('./Seller.js');
const SellerContact = require('./SellerContact.js');

const setRoutes = express => {
    express.use('/Api/Login', login);
    express.use('/Api/Products', Products);
    express.use('/Api/Seller', Seller);
    express.use('/Api/SellerContact', SellerContact);
}

module.exports = setRoutes;