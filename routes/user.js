var express = require("express");
var router = express.Router();
const UserController = require("../controllers/user-controller");


router.get("/", UserController.verifyLogin, UserController.loadDashHome);
router.get("/clients", UserController.verifyLogin, UserController.allClinets);
router.get("/clients/create", UserController.verifyLogin, UserController.loadCreateClient);
router.post("/clients/create", UserController.verifyLogin, UserController.processCreateClient);
router.get('/enquiries', UserController.verifyLogin, UserController.loadEnquiries);
router.get('/enquiries/create', UserController.verifyLogin, UserController.loadCreateEnquiries);
router.post('/enquiries/create', UserController.verifyLogin, UserController.processCreateEnquiry)
router.get('/enquiries/view/:id', UserController.verifyLogin, UserController.loadViewEnquiries)
router.get('/enquiries/update', UserController.verifyLogin, UserController.loadEnquiryUpdateCreate);
router.post('/enquiries/update', UserController.verifyLogin, UserController.processEnquiryUpdateCreate);
router.get('/reports/sales-monthly', UserController.verifyLogin, UserController.loadMonthlyReport);
router.get('/reports/enquiries', UserController.verifyLogin, UserController.loadEnquiryReportRequest);
router.post('/enquiries/close-request', UserController.verifyLogin, UserController.processCloseRequest);

module.exports = router;
