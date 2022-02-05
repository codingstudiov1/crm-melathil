var express = require('express');
var router = express.Router();
const AdminController = require('../controllers/admin-controller');

router.get('/', AdminController.loadAdminDashboard);

router.get('/employee-requests', AdminController.loadPendingRequests);
router.get('/working-employees', AdminController.loadWorkingEmployees);
router.get('/approve-user/:id', AdminController.loadApproveEmployees)
router.post('/approve-user', AdminController.processApproveUser)

router.get('/clients', AdminController.loadClients);
router.get('/client-types', AdminController.loadClientTypes);
router.get('/create-client-type', AdminController.loadClientTypeCreate);
router.post('/create-client-type', AdminController.processCreateClientType);


// Get employee profile
router.get('/employees/:id', AdminController.loadEmployeeProfile);
// View working enquiries
router.get('/enquiries/working', AdminController.loadOpenedEnquiries);
// All Enquiries
router.get('/enquiries', AdminController.loadAllEnquiries);
router.get('/enquiries/closed', AdminController.loadClosedEnquiries);
router.get('/enquiries/:id', AdminController.loadEnquiryDetails);
router.get('/enquiry/close', AdminController.loadCloseEnquiry);
router.post('/enquiry/close',AdminController.processCloseEnquiry)
module.exports = router;