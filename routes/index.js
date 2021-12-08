var express = require("express");
var router = express.Router();
const helper = require("../helpers/helpers");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/login");
});
router.get("/login", function (req, res, next) {
 if(req.session.userSession){
    res.redirect('/dashboard/home')
 }
 else{
  res.render("login", { title: "Express" });
 }
});
router.post("/login", (req, res, next) => {
  let data = req.body;
  helper
    .getUserLogin(data)
    .then((response) => {
      req.session.userSession = response.user;
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(401).json(error);
    });
});
router.get("/register", function (req, res, next) {
  res.render("employees/register-employee");
});
router.post("/register", (req, res, next) => {
  let userData = req.body;
  helper
    .createUser(userData)
    .then(() => {
      res.status(200).json({
        message:
          "Employee " +
          userData.firstName +
          " " +
          userData.lastName +
          " is created successfully..Please wait for admin authentication..",
      });
    })
    .catch((error) => {
      res.status(401).json(error);
    });
});

module.exports = router;
