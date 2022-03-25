var express = require("express");
var router = express.Router();
const { body } = require('express-validator');
const { TOKEN_KEY } = require("../config/strings");
const IndexController = require('../controllers/index-controller');
const User = require('../models/user-model');


router.get("/", IndexController.loadIndexPage);
router.get("/register", IndexController.loadRegistrationPage);
router.post("/register", IndexController.processEmployeeRegistration);
router.get("/logout", IndexController.processLogout);

module.exports = router;
