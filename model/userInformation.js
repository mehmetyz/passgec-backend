const mongoose = require('../common/mongoose.js');

const userInformationSchema = mongoose.Schema('UserInformation', {
    id: String,
    userId: String,
    firstName: String,
    lastName: String,
    birthDate: Date,
    phoneNumber: String,
    createdAt: Date,
    updatedAt: Date
}, { _id: false, versionKey: false });