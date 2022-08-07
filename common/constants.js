const MONGO_URL = process.env.MONGO_URL;
const SECRET_KEY = process.env.SECRET_KEY;
const IMAGE_API_URL = process.env.IMAGE_API_URL;


if (!MONGO_URL) {
    throw new Error('MONGO_URL is not defined');
}

if (!SECRET_KEY) {
    throw new Error('SECRET_KEY is not defined');
}

const TABLE_NAMES = {
    USER: 'users',
    USER_INFORMATION: 'user_information',
    NOTIFICATION: 'notifications',
    FLIGHT: 'flights',
}

module.exports = {
    MONGO_URL,
    TABLE_NAMES,
    SECRET_KEY,
    IMAGE_API_URL
}

