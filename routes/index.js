const router = require('express').Router();
const authController = require('../controllers/authController');
const { isUser } = require('../middleware/auth');

router.get('/', isUser, (req, res) => res.redirect('/messages'));

router.get('/sign-up', authController.sign_up_get);
router.post('/sign-up', authController.sign_up_post);

router.get('/log-in', authController.log_in_get);
router.post('/log-in', authController.log_in_post);

router.get('/log-out', authController.log_out);

router.get('/not-registered', authController.not_registered);

router.get('/join-the-club', isUser, authController.join_the_club_get);
router.post('/join-the-club', isUser, authController.join_the_club_post);

module.exports = router;
