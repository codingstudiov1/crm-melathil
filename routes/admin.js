var express = require('express');
var router = express.Router();
const AdminController = require('../controllers/admin-controller');



router.get('/', AdminController.verifyLogin, AdminController.loadAdminDashboard);
router.get('/employee-requests', AdminController.verifyLogin, AdminController.loadPendingRequests);
router.get('/working-employees', AdminController.verifyLogin, AdminController.loadWorkingEmployees);
router.get('/resigned-employees', AdminController.verifyLogin, AdminController.loadResignedEmployees);
router.get('/approve-user/:id', AdminController.verifyLogin, AdminController.loadApproveEmployees)
router.post('/approve-user', AdminController.verifyLogin, AdminController.processApproveUser)

router.get('/clients', AdminController.verifyLogin, AdminController.loadClients);
router.get('/client-types', AdminController.verifyLogin, AdminController.loadClientTypes);
router.get('/create-client-type', AdminController.verifyLogin, AdminController.loadClientTypeCreate);
router.post('/create-client-type', AdminController.verifyLogin, AdminController.processCreateClientType);
router.get('/clients/create', AdminController.verifyLogin, AdminController.loadCreateClient)
router.post('/clients/create', AdminController.verifyLogin, AdminController.processCreateClient)
router.get("/clients/edit/:id", AdminController.verifyLogin, AdminController.loadEditClient);
router.post("/clients/edit/:id", AdminController.verifyLogin, AdminController.processEditClient);
router.get('/clients/delete/:id', AdminController.verifyLogin, AdminController.processDeleteClient);
// // Get employee profile

// // View working enquiries
// router.get('/enquiries/working', AdminController.verifyLogin, AdminController.loadOpenedEnquiries);
// // All Enquiries
router.get('/enquiries', AdminController.verifyLogin, AdminController.loadAllEnquiries);
router.get('/enquiries/:id', AdminController.verifyLogin, AdminController.loadEnquiryDetails);
router.get('/enquiry/modify/:id', AdminController.verifyLogin, AdminController.loadEnquiryModify);
router.get('/enquiry/closed', AdminController.verifyLogin, AdminController.loadClosedEnquiries);
router.get('/enquiry/failed', AdminController.verifyLogin, AdminController.loadFailedEnquiries);
router.get('/clients/:id', AdminController.verifyLogin, AdminController.loadClientDetails);
// router.get('/enquiry/close', AdminController.verifyLogin, AdminController.loadCloseEnquiry);
// router.post('/enquiry/close', AdminController.verifyLogin, AdminController.processCloseEnquiry);

router.get('/managers', AdminController.verifyLogin, AdminController.loadManagers);
router.get('/create-manager', AdminController.verifyLogin, AdminController.loadCreateManager);
router.post('/create-manager', AdminController.verifyLogin, AdminController.processCreateManager);
router.get('/manager/:id', AdminController.verifyLogin, AdminController.loadEditManager);
router.post('/edit-manager', AdminController.verifyLogin, AdminController.processEditManager);
router.get('/delete-manager/:id', AdminController.verifyLogin, AdminController.processDeleteManager);

router.get('/user-types/:type', AdminController.verifyLogin, AdminController.loadUsersByTypes);

router.get('/employees/:id', AdminController.verifyLogin, AdminController.loadEmployeeProfile);
router.get('/employees/:id/enquiries', AdminController.verifyLogin, AdminController.loadEmployeeEnquiries);

router.get('/close-requests', AdminController.verifyLogin, AdminController.loadCloseRequests);
router.get('/approve-close-enquiry/:id', AdminController.verifyLogin, AdminController.processApproveCloseEnquiry);
router.get('/change-password', AdminController.verifyLogin, AdminController.loadChangePassword);
router.post('/change-password', AdminController.verifyLogin, AdminController.processChangePassword);
module.exports = router;