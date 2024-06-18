const router = require('express').Router();
const messageController = require('../controllers/messageController');

router.get('/', messageController.messages_get);

router.get('/create', messageController.messages_create_get);

module.exports = router;
