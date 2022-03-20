var express = require('express');
var router = express.Router();
const AdminController = require('../controllers/admin-controller');

const verifyLogin = function (req, res, next) {
    // if (!req.session.adminSession) {
    //     req.session.destroy();
    //     res.redirect('/login');
    // }
    // else
    next();
}


router.get('/', verifyLogin, AdminController.loadAdminDashboard);
router.get('/employee-requests', verifyLogin, AdminController.loadPendingRequests);
router.get('/working-employees', verifyLogin, AdminController.loadWorkingEmployees);
router.get('/resigned-employees', verifyLogin, AdminController.loadResignedEmployees);
router.get('/approve-user/:id', verifyLogin, AdminController.loadApproveEmployees)
router.post('/approve-user', verifyLogin, AdminController.processApproveUser)

router.get('/clients', verifyLogin, AdminController.loadClients);
router.get('/client-types', verifyLogin, AdminController.loadClientTypes);
router.get('/create-client-type', verifyLogin, AdminController.loadClientTypeCreate);
router.post('/create-client-type', verifyLogin, AdminController.processCreateClientType);
router.get('/clients/create', verifyLogin, AdminController.loadCreateClient)
router.post('/clients/create', verifyLogin, AdminController.processCreateClient)
router.get("/clients/edit/:id", verifyLogin, AdminController.loadEditClient);
router.post("/clients/edit/:id", verifyLogin, AdminController.processEditClient);
router.get('/clients/delete/:id', verifyLogin, AdminController.processDeleteClient);
// // Get employee profile

// // View working enquiries
// router.get('/enquiries/working', verifyLogin, AdminController.loadOpenedEnquiries);
// // All Enquiries
router.get('/enquiries', verifyLogin, AdminController.loadAllEnquiries);
router.get('/enquiries/:id', verifyLogin, AdminController.loadEnquiryDetails);
router.get('/enquiry/modify/:id', verifyLogin, AdminController.loadEnquiryModify);
router.get('/enquiry/closed', verifyLogin, AdminController.loadClosedEnquiries);
router.get('/enquiry/failed', verifyLogin, AdminController.loadFailedEnquiries);
router.get('/clients/:id', verifyLogin, AdminController.loadClientDetails);
// router.get('/enquiry/close', verifyLogin, AdminController.loadCloseEnquiry);
// router.post('/enquiry/close', verifyLogin, AdminController.processCloseEnquiry);

router.get('/managers', verifyLogin, AdminController.loadManagers);
router.get('/create-manager', verifyLogin, AdminController.loadCreateManager);
router.post('/create-manager', verifyLogin, AdminController.processCreateManager);
router.get('/manager/:id', verifyLogin, AdminController.loadEditManager);
router.post('/edit-manager', verifyLogin, AdminController.processEditManager);
router.get('/delete-manager/:id', verifyLogin, AdminController.processDeleteManager);

router.get('/user-types/:type', verifyLogin, AdminController.loadUsersByTypes);

router.get('/employees/:id', verifyLogin, AdminController.loadEmployeeProfile);
router.get('/employees/:id/enquiries', verifyLogin, AdminController.loadEmployeeEnquiries);

module.exports = router;