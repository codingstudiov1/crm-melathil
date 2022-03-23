var express = require("express");
var router = express.Router();
const UserController = require("../controllers/user-controller");

const verifyLogin = function (req, res, next) {
  // if (!req.session.salesmanSession) {
  //   req.session.destroy();
  //   res.redirect('/login');
  // }
  // else
  next();

}
router.get("/", verifyLogin, UserController.loadDashHome);
router.get("/clients", verifyLogin, UserController.allClinets);
router.get("/clients/create", verifyLogin, UserController.loadCreateClient);
router.post("/clients/create", verifyLogin, UserController.processCreateClient);
router.get('/enquiries', verifyLogin, UserController.loadEnquiries);
router.get('/enquiries/create', verifyLogin, UserController.loadCreateEnquiries);
router.post('/enquiries/create', verifyLogin, UserController.processCreateEnquiry)
router.get('/enquiries/view/:id', verifyLogin, UserController.loadViewEnquiries)
router.get('/enquiries/update', verifyLogin, UserController.loadEnquiryUpdateCreate);
router.post('/enquiries/update', verifyLogin, UserController.processEnquiryUpdateCreate);
// router.get('/enquiries/all', verifyLogin, UserController.loadAllEnquiries);
router.get('/reports/sales-monthly', verifyLogin, UserController.loadMonthlyReport);
router.get('/reports/enquiries', verifyLogin, UserController.loadEnquiryReportRequest);
// router.get('/logout', UserController.processLogout);

router.post('/enquiries/close-request', UserController.processCloseRequest);

module.exports = router;
