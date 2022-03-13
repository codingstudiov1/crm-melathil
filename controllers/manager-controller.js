const mysqlHelper = require("../helpers/mysql-helper");

const values = { layout: "manager-layout", route: '/manager' }


module.exports.loadManagerHome = (req, res, next) => {
    res.render('manager/home', { ...values });
}

module.exports.loadNewRequests = (req, res, next) => {
    mysqlHelper.getPendingUsers().then((requests) => {
        res.render('admin/pending-requests', { ...values, pendingRequests: requests })
    })
}
module.exports.loadWorkingEmployees = (req, res, next) => {
    mysqlHelper.getActiveUsers().then((requests) => {
        res.render('admin/active-employees', { ...values, employees: requests })
    })
}
module.exports.loadManagerUser = async (req, res, next) => {
    let users = await mysqlHelper.getUsersByManager(4) //replace 4 with manager id
    let unManaged = await mysqlHelper.getNoManagerUsers();
    res.render('manager/manager-user', { ...values, users, unManaged });

}
module.exports.processManageUser = (req, res, next) => {
    managerId = 4;
    let userId = req.params.userId;
    mysqlHelper.allocateManager(managerId, userId).then(() => {
        res.redirect('/manager/manager-user');
    })
}