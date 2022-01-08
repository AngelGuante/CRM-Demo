const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const initModels = require('../db/models');

const sequelize = new Sequelize(config.dbUrl, {
    dialect: 'postgres'
});

initModels(sequelize);

module. exports = sequelize;