module.exports.loadAdminLogin = (req, res, next) => {

}
module.exports.loadUserLogin = (req, res, next) => {

}
module.exports.loadManagerLogin = (req, res, next) => {
    res.render('login', { action: '/login/admin', title: "Admin Login" })
}
module.exports.processAdminLogin = (req, res, next) => {
    res.render('login', { action: '/login/user', title: "User Login" })
}
module.exports.processUserLogin = (req, res, next) => {
    res.render('login', { action: '/login/manager', title: "Manager Login" })
}
module.exports.processManagerLogin = (req, res, next) => {

}