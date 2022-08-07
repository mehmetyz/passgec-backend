const bcrypt = require('bcrypt');

const hash = async (password) => {
    return bcrypt.hash(password, 5);
}

const compare = async (password, hash) => {
    return bcrypt.compare(password, hash);
}

module.exports = {
    hash,
    compare
}