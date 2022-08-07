
const mongoose = require('../common/mongoose.js');
const { FLIGHT } = require('../common/constants.js').TABLE_NAMES;


const collection = mongoose.connection.collection(FLIGHT);

const save = (flight) => {
    return collection.insertOne(flight);
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

const update = (flight) => {
    return collection.replaceOne({ id: flight.id }, flight);
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