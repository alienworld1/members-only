const router = require('express').Router();
const auth = require('../controllers/auth');

router.get('/', (req, res) => {
  res.render('index', {title: 'Home'});
});

router.get('/sign-up', auth.sign_up_get);
router.post('/sign-up', auth.sign_up_post);

module.exports = router;
