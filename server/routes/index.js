const login = require('./Login.js');

const setRoutes = express => {
    express.use('/Api/Login', login);
}

module.exports = setRoutes;