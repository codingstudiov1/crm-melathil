const Admin = require('../models/admin-model')
const Users = require('../models/user-model')
const Managers = require('../models/manager-model')
const bcrypt = require('bcryptjs');
let { ACTIVE_STATUS } = require('../config/strings')

module.exports.verifyLogin = (req, res, next) => {
    if (req.sesson?.adminSession) {
        res.redirect('/admin');
        return;
    }
    if (req.sesson?.managerSession) {
        res.redirect('/manager');
        return;
    }
    if (req.sesson?.userSession) {
        res.redirect('/user');
        return;
    }
    next();

}


module.exports.loadAdminLogin = (req, res, next) => {
    res.render('login', { action: '/login/admin', title: "Admin Login" })
}
module.exports.loadUserLogin = (req, res, next) => {
    res.render('login', { action: '/login/user', title: "User Login" })
}
module.exports.loadManagerLogin = (req, res, next) => {
    res.render('login', { action: '/login/manager', title: "Manager Login" })
}
module.exports.processAdminLogin = async (req, res, next) => {
    let data = req.body;
    let user = await Admin.findOne({ $or: [{ email: data.username }, { phone: data.username }] })
    if (user) {
        let isTruePassword = await bcrypt.compare(data.password, user.password);
        if (isTruePassword) {
            req.session.adminSession = {
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
            }
            res.send({ status: true, redirect: '/admin' });
        }
        else {
            res.send({ message: "Invalid Password" });
        }
    }
    else {
        res.send({ message: 'Invalid Username' });
    }
}
module.exports.processUserLogin = async (req, res, next) => {
    let data = req.body;
    let user = await Users.findOne({ $or: [{ email: data.username }, { phone: data.username }], user_status: ACTIVE_STATUS })
    if (user) {
        let isTruePassword = await bcrypt.compare(data.password, user.password);
        if (isTruePassword) {
            req.session.userSession = {
                _id: user._id,
                first_name: user.firstNameame,
                last_name: user.lasName,
            }
            res.send({ status: true, redirect: '/user' });
        }
        else {
            res.send({ message: "Invalid Password" });
        }
    }
    else {
        res.send({ message: 'Invalid Username' });
    }
}
module.exports.processManagerLogin = async (req, res, next) => {
    let data = req.body;
    let user = await Managers.findOne({ username: data.username })
    if (user) {
        let isTruePassword = await bcrypt.compare(data.password, user.password);
        if (isTruePassword) {
            req.session.managerSession = {
                _id: user._id,
                first_name: user.firstNameame,
                last_name: user.lasName,
            }
            res.send({ status: true, redirect: '/manager' });
        }
        else {
            res.send({ message: "Invalid Password" });
        }
    }
    else {
        res.send({ message: 'Invalid Username' });
    }
}