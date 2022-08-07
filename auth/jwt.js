const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../common/constants');

const generate = async (payload) => {
    return await jwt.sign(payload, SECRET_KEY);
}

const decode = async (token) => {
    return await jwt.verify(token, SECRET_KEY);
}

module.exports = {
    generate,
    decode
}