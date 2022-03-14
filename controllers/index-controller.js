const commonHelpers = require("../helpers/common-helpers");
const User = require('../models/user-model');
const { validationResult } = require('express-validator');

module.exports.loadIndexPage = (req, res, next) => {
    const routes = ["admin", "user", "manager"]
    res.render('index', { routes });
}


module.exports.loadRegistrationPage = function (req, res, next) {
    res.render("employees/register-employee", { action: '/register' });
}

module.exports.processEmployeeRegistration = (req, res, next) => {

    const errors = validationResult(req);
    console.log(errors.formatter);
    let userData = req.body;
    commonHelpers.createUser(userData).then((response) => {
        res.json({
            message:
                "Employee " +
                userData.firstName +
                " " +
                userData.lastName +
                " is created successfully..Please wait for admin authentication..",
        }).catch(error => {
            console.log(error);
        })
    })
    // mysqlHelper.insertUser(userData).then(() => {
    //     res.json({
    //         message:
    //             "Employee " +
    //             userData.firstName +
    //             " " +
    //             userData.lastName +
    //             " is created successfully..Please wait for admin authentication..",
    //     })
    // });
}