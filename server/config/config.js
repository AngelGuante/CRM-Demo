const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const config = {
    dbUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET
};

module.exports = { config };