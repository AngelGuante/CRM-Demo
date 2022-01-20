const login = require('./Login.js');
const Portal = require('./Portal.js');

const setRoutes = express => {
    express.use('/Api/Login', login);
    express.use('/Api/Portal', Portal);
}

module.exports = setRoutes;