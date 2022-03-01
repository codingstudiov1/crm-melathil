var express = require("express");
var router = express.Router();
const dashboardController = require("../controllers/dashboard");
const verifyLogin = function (req, res, next) {
  // if (!req.session.salesmanSession) {
  //   req.session.destroy();
  //   res.redirect('/login');
  // }
  // else
    next();

}
router.get('/logout', dashboardController.processLogout);
router.get("/home", verifyLogin, dashboardController.loadDashHome);


// Routes for clients
router.get("/clients", verifyLogin, dashboardController.allClinets);
router.get("/clients/create", verifyLogin, dashboardController.loadCreateClient);
router.post("/clients/create", verifyLogin, dashboardController.processCreateClient);
router.get("/clients/delete/:id", verifyLogin, dashboardController.processDeleteClient);


router.get('/enquiries', verifyLogin, dashboardController.loadEnquiries);
router.get('/enquiries/create', verifyLogin, dashboardController.loadCreateEnquiries);
router.post('/enquiries/create', verifyLogin, dashboardController.processCreateEnquiry)
router.get('/enquiries/view/:id', verifyLogin, dashboardController.loadViewEnquiries)
router.get('/enquiries/update', verifyLogin, dashboardController.loadEnquiryUpdateCreate);
router.post('/enquiries/update', verifyLogin, dashboardController.processEnquiryUpdateCreate);
router.get('/enquiries/all', verifyLogin, dashboardController.loadAllEnquiries);
router.get('/reports/enquiries', verifyLogin, dashboardController.loadEnquiryReportRequest);
router.get('/reports/today', verifyLogin, dashboardController.loadTodaysReport);

module.exports = router;
