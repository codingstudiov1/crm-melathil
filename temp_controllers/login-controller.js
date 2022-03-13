const mysqlHelper = require("../helpers/mysql-helper")

module.exports.loadAdminLogin = (req, res, next) => {
    res.render('login', { action: '/login/admin', title: "Admin Login" })
}
module.exports.loadUserLogin = (req, res, next) => {
    res.render('login', { action: '/login/user', title: "User Login" })
}
module.exports.loadManagerLogin = (req, res, next) => {
    res.render('login', { action: '/login/manager', title: "Manager Login" })

}
module.exports.processAdminLogin = (req, res, next) => {
    let userData = req.body;
    console.log(userData);
    mysqlHelper.getAdminLogin(userData).then(response => {
        if (response.length < 1) {
            res.status(200).json({ message: "Invalid username or password. Please check the details again" });
        }
        else {
            req.session.adminSession = response[0];
            res.status(200).json({ status: true, redirect: '/admin' });
        }
    })

}
module.exports.processUserLogin = (req, res, next) => {

}
module.exports.processManagerLogin = (req, res, next) => {

}