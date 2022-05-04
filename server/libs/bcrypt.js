const bcrypt = require('bcrypt');

const HashPassword = async password =>
    await bcrypt.hash(password, 10);

const CompareHashPassword = async (password, hash) =>
    await bcrypt.compare(password, hash);

module.exports = { HashPassword, CompareHashPassword }