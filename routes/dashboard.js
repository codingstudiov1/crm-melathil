var express = require("express");
var router = express.Router();
const viewData = { layout: "dashboard-layout" };
const dashboardController = require("../controllers/dashboard");
const passport = require('passport');
let permissions = {};
const verifyLogin = function (req, res, next) {
  // if (req.session.userSession) {
  //   next();
  // }
  // else {
  //   res.redirect('/login');
  // }
  next();

}

router.get('/logout', dashboardController.processLogout);
router.get("/home", verifyLogin, dashboardController.loadDashHome);


// Routes for clients
router.get("/clients", verifyLogin, dashboardController.allClinets);
router.get("/clients/create", verifyLogin, dashboardController.loadCreateClient);
router.post("/clients/create", verifyLogin, dashboardController.processCreateClient);
router.get("/clients/edit/:id", verifyLogin, dashboardController.loadEditClient);
router.post("/clients/edit/:id", verifyLogin, dashboardController.processEditClient);
router.get("/clients/delete/:id", verifyLogin, dashboardController.processDeleteClient);


router.get('/enquiries', verifyLogin, dashboardController.loadEnquiries);
router.get('/enquiries/create', verifyLogin, dashboardController.loadCreateEnquiries);
router.post('/enquiries/create', verifyLogin, dashboardController.processCreateEnquiry)
router.get('/enquiries/view/:id', verifyLogin, dashboardController.loadViewEnquiries)
router.get('/enquiries/update', verifyLogin, dashboardController.loadEnquiryUpdateCreate);
router.post('/enquiries/update', verifyLogin, dashboardController.processEnquiryUpdateCreate);
router.get('/enquiries/all', dashboardController.loadAllEnquiries);

router.get('/reports/enquiries', dashboardController.loadEnquiryReportRequest);
router.get('/reports/today', dashboardController.loadTodaysReport);

module.exports = router;
