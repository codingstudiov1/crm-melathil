var express = require('express');
var router = express.Router();
var LoginController = require('../controllers/login-controller');

router.get('/admin', LoginController.loadAdminLogin);
router.get('/user', LoginController.loadUserLogin);
router.get('/manager', LoginController.loadManagerLogin);
router.post('/admin', LoginController.processAdminLogin);
router.post('/user', LoginController.processUserLogin);
router.post('/manager', LoginController.processManagerLogin);



module.exports = router;