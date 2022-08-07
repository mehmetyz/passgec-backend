const mongoose = require('../common/mongoose.js');
export const Account = mongoose.Schema('User', {
    id: String,
    email: String,
    fullname: String,
    password: String,
    createdAt: Date,
    updatedAt: Date,
    image: String,
}, { _id: false, versionKey: false });

