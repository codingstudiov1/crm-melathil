var express = require("express");
var router = express.Router();
const { body } = require('express-validator');
const { TOKEN_KEY } = require("../config/strings");
const IndexController = require('../controllers/index-controller');
const User = require('../models/user-model');


router.get("/", IndexController.loadIndexPage);
router.get("/register", IndexController.loadRegistrationPage);
router.post("/register", IndexController.processEmployeeRegistration);

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



module.exports = router;
