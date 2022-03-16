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

    let userData = req.body;
    commonHelpers.userPhoneDuplication(userData.phone).then(response => {
        if (response) res.json({ message: 'Phone number alredy registered' });
        else return commonHelpers.userEmailDuplication(userData.email)
    }).then((response) => {
        if (response) res.json({ message: 'Email alredy registered' });
        else return commonHelpers.createUser(userData)
    }).then(() => {
        res.json({
            status: true,
            message:
                "Employee " +
                userData.firstName +
                " " +
                userData.lastName +
                " is created successfully..Please wait for admin authentication..",
        })
    }).catch(error => {
        res.json(error);
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