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
router.get('/approve-user/:id', verifyLogin, AdminController.loadApproveEmployees)
router.post('/approve-user', verifyLogin, AdminController.processApproveUser)

router.get('/clients', verifyLogin, AdminController.loadClients);
router.get('/client-types', verifyLogin, AdminController.loadClientTypes);
router.get('/create-client-type', verifyLogin, AdminController.loadClientTypeCreate);
router.post('/create-client-type', verifyLogin, AdminController.processCreateClientType);
router.get("/clients/edit/:id", verifyLogin, AdminController.loadEditClient);
router.post("/clients/edit/:id", verifyLogin, AdminController.processEditClient);

// Get employee profile
router.get('/employees/:id', verifyLogin, AdminController.loadEmployeeProfile);
// View working enquiries
router.get('/enquiries/working', verifyLogin, AdminController.loadOpenedEnquiries);
// All Enquiries
router.get('/enquiries', verifyLogin, AdminController.loadAllEnquiries);
router.get('/enquiries/closed', verifyLogin, AdminController.loadClosedEnquiries);
router.get('/enquiries/:id', verifyLogin, AdminController.loadEnquiryDetails);
router.get('/enquiry/close', verifyLogin, AdminController.loadCloseEnquiry);
router.post('/enquiry/close', verifyLogin, AdminController.processCloseEnquiry);

router.get('/create-manager', verifyLogin, AdminController.loadCreateManager);
router.post('/create-manager', verifyLogin, AdminController.processCreateManager);
router.get('/manager/:id', verifyLogin, AdminController.loadEditManager);
router.post('/edit-manager', verifyLogin, AdminController.processEditManager);
router.get('/delete-manager/:id',verifyLogin,AdminController.processDeleteManager);
module.exports = router;