var express = require('express');
var router = express.Router();
const ManagerController = require('../controllers/manager-controller');

router.get('/', ManagerController.loadManagerHome);
router.get('/employee-requests', ManagerController.loadNewRequests);
router.get('/working-employees', ManagerController.loadWorkingEmployees);
router.get('/manager-user', ManagerController.loadManagerUser);
router.get('/add-to-user/:userId', ManagerController.processManageUser);


module.exports = router;