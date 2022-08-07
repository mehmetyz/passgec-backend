const express = require('express');

const auth = require('../middleware/auth.middleware');

const { login, register } = require('../controller/auth.controller');
const { update, remove, details, createQRCode, uploadAvatar } = require('../controller/user.controller');

const router = express.Router();

router.use(require('express-fileupload')());

router.post('/login', login);
router.post('/register', register);

router.put('/me', auth, update);
router.delete('/me', auth, remove);
router.get('/me', auth, details);
router.post('/avatar', auth, uploadAvatar);

router.get('/qrcode',auth, createQRCode);

module.exports = router;