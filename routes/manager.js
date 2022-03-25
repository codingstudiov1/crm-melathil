var express = require('express');
var router = express.Router();
const ManagerController = require('../controllers/manager-controller');

router.get('/', ManagerController.verifyLogin, ManagerController.loadManagerHome);
router.get('/employee-requests', ManagerController.verifyLogin, ManagerController.loadNewRequests);
router.get('/working-employees', ManagerController.verifyLogin, ManagerController.loadWorkingEmployees);
router.get('/manager-user', ManagerController.verifyLogin, ManagerController.loadManagerUser);
router.get('/approve-user/:id', ManagerController.verifyLogin, ManagerController.loadApproveUser);
router.get('/add-to-user/:userId', ManagerController.verifyLogin, ManagerController.processManageUser);
router.post('/approve-user', ManagerController.verifyLogin, ManagerController.processApproveUser);

// router.get('/reports', ManagerController.loadReports);

module.exports = router;