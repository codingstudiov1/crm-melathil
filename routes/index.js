var express = require("express");
var router = express.Router();
const helper = require('../helpers/helpers');

/* GET home page. */
router.get("/", function (req, res, next) {
 
  res.redirect("/login");
});
router.get("/login", function (req, res, next) {
  res.render("login", { title: "Express" });
});
router.get("/register", function (req, res, next) {
  res.render("employees/register-employee");
});
module.exports = router;
