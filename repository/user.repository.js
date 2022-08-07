
const mongoose = require('../common/mongoose.js');
const { USER } = require('../common/constants.js').TABLE_NAMES;


const collection = mongoose.connection.collection(USER);

const save = (user) => {
    return collection.insertOne(user);
}

const find = (id) => {
    return collection.findOne({ id });
}

const findByEmail = (email) => {
    return collection.findOne({ email });
}

const findAll = () => {
    return collection.find({}).toArray();
}

const update = (user) => {
    return collection.replaceOne({ id: user.id }, user);
}

const remove = (id) => {
    return collection.deleteOne({ id });
}

module.exports = {
    save,
    find,
    findByEmail,
    findAll,
    update,
    remove
}