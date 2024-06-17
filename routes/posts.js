const router = require('express').Router();
const postsController = require('../controllers/postsController');

router.get('/', postsController.posts_get);

module.exports = router;
