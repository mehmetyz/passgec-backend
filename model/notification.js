const mongoose = require('../common/mongoose.js');
export const Notification = mongoose.Schema('Notification', {
    id: String,
    userId: String,
    type: String,
    title: String,
    text: String,
    time: String
}, { _id: false, versionKey: false });

