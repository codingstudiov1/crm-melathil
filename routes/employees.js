var express = require("express");
const employeesControler = require("../controllers/employees");
var router = express.Router();

router.get(
  "/dashboard",
  employeesControler.verifyLogin,
  employeesControler.loadEmployeeDashboard
);
router.get("/enquiries");
router.get("/enquiries/create-enquiry");
router.post("/enquiries/create-enquiry");
router.get("/enquiries/modify-enquiry");
router.get("/enquiries/delete-enquiry");
module.exports = router;
