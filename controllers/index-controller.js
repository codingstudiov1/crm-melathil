const commonHelpers = require("../helpers/common-helpers");
const User = require('../models/user-model');
const { validationResult } = require('express-validator');
const { PENDING_STATUS } = require("../config/strings");

module.exports.loadIndexPage = (req, res, next) => {
    const routes = ["admin", "user", "manager"]
    res.render('index', { routes });
}


module.exports.loadRegistrationPage = function (req, res, next) {
    res.render("employees/register-employee", { action: '/register' });
}

module.exports.processEmployeeRegistration = async (req, res, next) => {

    let userData = req.body;
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.user_status = PENDING_STATUS;
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
module.exports.processCreateAdmin = async (req, res, next) => {
    const Admin = require('../models/admin-model');
    const bcrypt = require('bcryptjs');
    let data = req.body;
    data.password = await bcrypt.hash(data.password, 10);
    const adm = new Admin(data);
    console.log(adm)
    adm.save().then(() => {
        res.send('Created')
    })
}
module.exports.processLogout = async (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
}