const router = require('express').Router();
const messageController = require('../controllers/messageController');

router.get('/', messageController.messages_get);

module.exports = router;
