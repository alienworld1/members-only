const router = require('express').Router();
const authController = require('../controllers/authController');
const { isUser } = require('../middleware/auth');

router.get('/', isUser, (req, res) => res.redirect('/posts'));

router.get('/sign-up', authController.sign_up_get);
router.post('/sign-up', authController.sign_up_post);

router.get('/log-in', authController.log_in_get);
router.post('/log-in', authController.log_in_post);

router.get('/not-registered', authController.not_registered);

module.exports = router;
