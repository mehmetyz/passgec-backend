const mongoose = require('../common/mongoose.js');
const { USER_INFORMATION } = require('../common/constants.js').TABLE_NAMES;

const collection = mongoose.connection.collection(USER_INFORMATION);

const save = (userInformation) => {
    return collection.insertOne(userInformation);
}

const find = (id) => {
    return collection.findOne({ id });
}

const findByUserId = (userId) => {
    return collection.findOne({ userId });
}

const findAll = () => {
    return collection.find({}).toArray();
}

const update = (userInformation) => {
    return collection.replaceOne({ id: userInformation.id }, userInformation);
}

const remove = (id) => {
    return collection.deleteOne({ id });
}

const removeByUserId = (userId) => {
    return collection.deleteMany({ userId });
}


module.exports = {
    save,
    find,
    findByUserId,
    findAll,
    update,
    remove,
    removeByUserId
}