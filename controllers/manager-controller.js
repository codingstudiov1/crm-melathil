const moment = require('moment');
const { PENDING_STATUS, ACTIVE_STATUS, USER_TYPES } = require("../config/strings");
const userHelpers = require('../helpers/user-helpers');

const extra = { layout: "manager-layout", route: 'manager', moment, user: { _id: '6235e05b3308a985d2e78d1e' } };


module.exports.loadManagerHome = (req, res, next) => {
    res.render('manager/home', { ...extra, });
}

module.exports.loadNewRequests = (req, res, next) => {
    userHelpers.getUsersByStatus(PENDING_STATUS).then((requests) => {
        res.render('admin/pending-requests', { ...extra, pendingRequests: requests })
    })
}
module.exports.loadWorkingEmployees = (req, res, next) => {
    userHelpers.getSingleUser(ACTIVE_STATUS).then((requests) => {
        res.render('admin/employees', { ...extra, employees: requests })
    })
}
module.exports.loadManagerUser = async (req, res, next) => {
    let manager = extra.user._id
    let users = await userHelpers.getUsers({ managed_by: manager, })
    let unManaged = await userHelpers.getUsers({ managed_by: null, user_status: ACTIVE_STATUS });
    console.log(unManaged);
    res.render('manager/manager-user', { ...extra, users, unManaged });

}
module.exports.processManageUser = (req, res, next) => {
    let managerId = extra.user._id;
    let userId = req.params.userId;
    userHelpers.updateUsers(userId, { managed_by: managerId }).then(() => {
        res.redirect('/manager/manager-user');
    })
}
module.exports.loadApproveUser = async (req, res, next) => {
    let userId = req.params.id;
    userHelpers.getSingleUser({ _id: userId, user_status: PENDING_STATUS }).then((user) => {
        req.session.approveUserId = userId;
        res.render('admin/approve-user', { ...extra, types: USER_TYPES, user, action: '/manager/approve-user' })
    })
}
module.exports.processApproveUser = (req, res, next) => {
    let userId = req.session.approveUserId;
    req.session.approveUserId = null;
    let data = req.body;
    data.user_status = ACTIVE_STATUS;
    data.managed_by = extra.user._id;
    userHelpers.updateUsers(userId, data ).then(() => {
        res.status(200).json({ status: true, message: "User approved",redirect:"/manager/employee-requests" });
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
        res.render('reports/reports', { ...extra, title: 'Report', users, report, text: '' });
    })


}