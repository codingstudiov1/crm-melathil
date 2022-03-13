module.exports.loadIndexPage = (req, res, next) => {
    const routes = ["admin", "user", "manager"]
    res.render('index', { routes });
}


module.exports.loadRegistrationPage = function (req, res, next) {
    res.render("employees/register-employee");
}