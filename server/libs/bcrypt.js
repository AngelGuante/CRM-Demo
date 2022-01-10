const bcrypt = require('bcrypt');

const HashPassword = async password => {
    return await bcrypt.hash(password, 10);
};

const CompareHashPassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

module.exports = { HashPassword, CompareHashPassword }