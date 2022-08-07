
const mongoose = require('../common/mongoose.js');
const { NOTIFICATION } = require('../common/constants.js').TABLE_NAMES;


const collection = mongoose.connection.collection(NOTIFICATION);

const save = (notification) => {
    return collection.insertOne(notification);
}

const find = (id) => {
    return collection.findOne({ id });
}

const findAllByUserId = (userId) => {
    return collection.find({ userId });
}

const findAll = () => {
    return collection.find({}).toArray();
}

const update = (notification) => {
    return collection.replaceOne({ id: notification.id }, notification);
}

const remove = (id) => {
    return collection.deleteOne({ id });
}

module.exports = {
    save,
    find,
    findAllByUserId,
    findAll,
    update,
    remove
}