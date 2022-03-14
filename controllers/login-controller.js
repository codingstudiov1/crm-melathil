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
    
}
module.exports.processUserLogin = (req, res, next) => {
    
}
module.exports.processManagerLogin = (req, res, next) => {

}