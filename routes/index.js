var express = require("express");
var router = express.Router();
const mysqlConnection = require('../config/mysql-connection');
const mysqlHelper = require("../helpers/mysql-helper");
const jwt = require('jsonwebtoken');
const { TOKEN_KEY } = require("../config/strings");


/* GET home page. */
router.get("/", function (req, res, next) {
  // res.redirect("/login");
});
// router.get("/login", function (req, res, next) {
//   if (req.session.userSession) {
//     res.redirect('/dashboard/home')
//   }
//   else if (req.session.adminSession) {
//     res.redirect('/admin')
//   }
//   else {
//     res.render("login", { title: "Express" });
//   }
// });
// router.post("/login", (req, res, next) => {
//   const { username, password } = req.body;
//   mysqlHelper.doLogin(username, password).then((response) => {
//     // req.session.userSession = response.user;
//     if (response.user.usertype === 'admin') {
//       req.session.adminSession = response.user;
//     }
//     else if (response.user.usertype === 'salesman') {
//       req.session.salesmanSession = response.user;
//     }
//     res.status(200).send({ status: true, usertype: response.user.usertype });
//   }).catch((error) => {
//     res.status(200).json(error)
//   })

// });
router.get("/register", function (req, res, next) {
  res.render("employees/register-employee");
});
router.post("/register", (req, res, next) => {
  let userData = req.body;
  mysqlHelper.insertUser(userData).then(() => {
    res.json({
      message:
        "Employee " +
        userData.firstName +
        " " +
        userData.lastName +
        " is created successfully..Please wait for admin authentication..",
    })
  });
});
module.exports = router;
