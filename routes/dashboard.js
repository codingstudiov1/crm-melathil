var express = require("express");
var router = express.Router();
const viewData = { layout: "dashboard-layout" };
const helpers = require("../helpers/helpers");
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
  permissions = req.session.userSession.permissions;
}

router.get("/register", (req, res, next) => {
  res.render("admin/register");
});
// Admin registration
router.post("/register", function (req, res, next) {
  let data = req.body;
  helpers.createAdmin(data).then((response) => {
    res.status(200).json(response);
  });
});
router.get('/logout', dashboardController.processLogout);
router.get("/home", verifyLogin, dashboardController.loadDashHome);

router.get("/requests", verifyLogin, (req, res, next) => {
  res.render("admin/requests", viewData);
});
router.get("/employees/requests", verifyLogin, (req, res, next) => {
  helpers.getPendingRequests().then((result) => {
    viewData.pendingRequests = result;
    res.render("admin/pending-requests", viewData);
  });
});

router.get("/employees/active", verifyLogin, dashboardController.activeEmployees);
router.get("/employees/requests/reject/:id", dashboardController.rejectEmployee);
router.get("/employees/requests/approve/:id", (req, res, next) => {
  let id = req.params.id;
  helpers.approveEmployee(id).then(() => {
    // res.json({ status: true, message: "Approved" });
    res.redirect("/dashboard/employees/requests");
  });
});

// Routes for clients
router.get("/clients/", verifyLogin, dashboardController.allClinets);
router.get("/clients/create", verifyLogin, dashboardController.loadCreateClient);
router.post("/clients/create", verifyLogin, dashboardController.processCreateClient);
router.get("/clients/delete/:id", verifyLogin, dashboardController.processDeleteClient);
router.get("/clients/edit/:id", verifyLogin, dashboardController.loadEditClient);
router.post("/clients/edit/:id", verifyLogin, dashboardController.processEditClient);
router.get("/clients/client-types", verifyLogin, dashboardController.loadClientTypes);
router.get("/clients/client-types/create", verifyLogin, dashboardController.loadClientTypeCreate);
router.post("/clients/client-types/create", verifyLogin, dashboardController.processClientTypeCreate);


// Routes for emloyees

router.post(
  "/clients/client-types/create", verifyLogin,
  dashboardController.processClientTypeCreate
);
router.get(
  "/clients/client-types/modify/:id", verifyLogin,
  dashboardController.loadClientTypeModify
);
router.post(
  "/clients/client-types/modify/:id", verifyLogin,
  dashboardController.processClientTypeModify
);
router.get(
  "/clients/client-types/delete/:id", verifyLogin,
  dashboardController.processClientTypeDelete
);

// permissions
router.get("/usertypes", verifyLogin, dashboardController.loadUserTypes);
router.get("/usertypes/create", verifyLogin, dashboardController.loadUserTypesCreate);
router.get("/usertypes/modify/:typeId", verifyLogin, dashboardController.loadUserTypesModify);
router.get("/usertypes/delete/:typeId", verifyLogin, dashboardController.processUserTypesDelete);
router.post("/usertypes/create", verifyLogin, dashboardController.processUserTypesCreate);
router.post("/usertypes/modify/:typeId", verifyLogin, dashboardController.processUserTypesModify);


router.get('/enquiries', verifyLogin, dashboardController.loadEnquiries);
router.get('/enquiries/create', verifyLogin, dashboardController.loadCreateEnquiries);
router.post('/enquiries/create', verifyLogin, dashboardController.processCreateEnquiry)
router.get('/enquiries/view/:id', verifyLogin, dashboardController.loadViewEnquiries)
router.get('/enquiries/update/:id', verifyLogin, dashboardController.loadEnquiryUpdateCreate);
router.post('/enquiries/update/:id', verifyLogin, dashboardController.processEnquiryUpdateCreate);
router.get('/enquiries/all', dashboardController.loadAllEnquiries);

module.exports = router;
