const Admin = require('../models/admin-model')
const Users = require('../models/user-model')
const Managers = require('../models/manager-model')
const bcrypt = require('bcryptjs');

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
                first_name:user.first_name,
                last_name:user.last_name,
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
module.exports.processUserLogin = (req, res, next) => {

}
module.exports.processManagerLogin = (req, res, next) => {

}