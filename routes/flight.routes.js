const express = require('express');

const auth = require('../middleware/auth.middleware');

const {
    create,
    findByUserId,
    find,
    update,
    remove

} = require('../controller/flight.controller');

const router = express.Router();

router.post('/', auth, create);
router.get('/:userId', auth, findByUserId);
router.get('/:id', auth, find);
router.put('/:id', auth, update);
router.delete('/:id', auth, remove);

module.exports = router;