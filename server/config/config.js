require('dotenv').config();

const config = {
    dbUrl: process.env.DATABASE_URL
};

module.exports = { config };