const router = require('express').Router();

const adminController = require('../controllers/adminController');
const { isAdmin } = require('../middleware/auth');

router.get('/', adminController.admin_form_get);
router.post('/', adminController.admin_form_post);

router.post('/delete/:id', isAdmin, adminController.admin_message_delete);

module.exports = router;
