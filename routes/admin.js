var express = require("express");
var router = express.Router();
const viewData = { layout: "admin-layout" };
const helpers = require("../helpers/helpers");
const adminController = require("../controllers/admin");

router.get("/register", (req, res, next) => {
  res.render("admin/register", viewData);
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

router.get("/employees/active", adminController.activeEmployees);
router.get("/employees/requests/reject/:id", adminController.rejectEmployee);
router.get("/employees/requests/approve/:id", (req, res, next) => {
  let id = req.params.id;
  helpers.approveEmployee(id).then(() => {
    // res.json({ status: true, message: "Approved" });
    res.redirect("/admin/employees/requests");
  });
});

// Routes for clients
router.get("/clients/", adminController.allClinets);
router.get("/clients/create", adminController.loadCreateClient);
router.get("/clients/delete:id");
router.get("/clients/modify:id");
router.get("/clients/client-types", adminController.loadClientTypes);
router.get(
  "/clients/client-types/create",
  adminController.loadClientTypeCreate
);
router.post("/clients/client-types/create");

module.exports = router;
