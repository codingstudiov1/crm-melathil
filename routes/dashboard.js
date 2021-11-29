var express = require("express");
var router = express.Router();
const viewData = { layout: "dashboard-layout" };
const helpers = require("../helpers/helpers");
const dashboardController = require("../controllers/dashboard");

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
router.get("/login", (req, res, next) => {
  res.render("admin/login");
});
router.post("/login", (req, res, next) => {
  let credentials = req.body;
  helpers
    .getLogin(credentials)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(401).json(error);
    });
});
router.get("/home", (req, res, next) => {
  res.render("admin/home", viewData);
});

router.get("/requests", (req, res, next) => {
  res.render("admin/requests", viewData);
});
router.get("/employees/requests", (req, res, next) => {
  helpers.getPendingRequests().then((result) => {
    viewData.pendingRequests = result;
    res.render("admin/pending-requests", viewData);
  });
});

router.get("/employees/active", dashboardController.activeEmployees);
router.get("/employees/requests/reject/:id", dashboardController.rejectEmployee);
router.get("/employees/requests/approve/:id", (req, res, next) => {
  let id = req.params.id;
  helpers.approveEmployee(id).then(() => {
    // res.json({ status: true, message: "Approved" });
    res.redirect("/dashboard/employees/requests");
  });
});

// Routes for clients
router.get("/clients/", dashboardController.allClinets);
router.get("/clients/create", dashboardController.loadCreateClient);
router.get("/clients/delete:id");
router.get("/clients/modify:id");
router.get("/clients/client-types", dashboardController.loadClientTypes);
router.get("/clients/client-types/create", dashboardController.loadClientTypeCreate);
router.post("/clients/client-types/create", dashboardController.processClientTypeCreate);


// Routes for emloyees
router.get('/enquiries', dashboardController.loadEnquiries);
router.post(
  "/clients/client-types/create",
  dashboardController.processClientTypeCreate
);
router.get(
  "/clients/client-types/modify/:id",
  dashboardController.loadClientTypeModify
);
router.post(
  "/clients/client-types/modify/:id",
  dashboardController.processClientTypeModify
);
router.get(
  "/clients/client-types/delete/:id",
  dashboardController.processClientTypeDelete
);

// permissions
router.get("/usertypes", dashboardController.loadUserTypes);
router.get("/usertypes/create", dashboardController.loadUserTypesCreate);
router.get("/usertypes/modify/:typeId", dashboardController.loadUserTypesModify);
router.get("/usertypes/delete/:typeId", dashboardController.processUserTypesDelete);
router.post("/usertypes/create", dashboardController.processUserTypesCreate);
router.post("/usertypes/modify/:typeId", dashboardController.processUserTypesModify);

module.exports = router;
