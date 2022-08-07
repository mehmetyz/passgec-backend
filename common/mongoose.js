const {
    MONGO_URL
} = require('./constants');

const mongoose = require('mongoose');
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Error connecting to MongoDB: ', err.message);
});
module.exports = mongoose;