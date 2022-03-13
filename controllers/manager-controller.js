const moment = require('moment');
const { PENDING_STATUS } = require("../config/strings");
const mysqlHelper = require("../helpers/mysql-helper");

const values = { layout: "manager-layout", route: '/manager', moment }


module.exports.loadManagerHome = (req, res, next) => {
    res.render('manager/home', { ...values });
}

module.exports.loadNewRequests = (req, res, next) => {
    mysqlHelper.getUserByStatus(PENDING_STATUS).then((requests) => {
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
    let managerId = 4;
    let userId = req.params.userId;
    mysqlHelper.allocateManager(managerId, userId).then(() => {
        res.redirect('/manager/manager-user');
    })
}
module.exports.processApproveUser = (req, res, next) => {
    let managerId = 4;
    let userId = req.params.userId;
    mysqlHelper.approveUserByManager(managerId, userId).then(() => {
        res.redirect('/manager/manager-user');
    })
}

module.exports.loadReports = async (req, res, next) => {
    let managerId = 4;
    let users = await mysqlHelper.getUsersByManager(4) //replace 4 with manager id
    mysqlHelper.getActiveEnquiryByManager(managerId, req.query).then((report) => {
        // let text = `Report Prepared By Manager from ${from} to ${to}
        // \n
        // Filters:
        // Salesman : ${user}
        
        // `
        res.render('reports/reports', { ...values, title: 'Report', users, report,text:'' });
    })


}