const mysqlHelper = require('../helpers/mysql-helper');

module.exports.loadAdminDashboard = function (req, res, next) {
    res.render('admin/admin-dashboard', { layout: 'admin-layout' });
}

module.exports.loadPendingRequests = function (req, res, next) {
    mysqlHelper.getPendingUsers().then((requests) => {
        console.log(requests);
        res.render('admin/pending-requests', { layout: 'admin-layout', pendingRequests: requests })
    })

}
module.exports.loadWorkingEmployees = function (req, res, next) {
    mysqlHelper.getActiveUsers().then((requests) => {
        console.log(requests);
        res.render('admin/active-employees', { layout: 'admin-layout', employees: requests })
    })

}

module.exports.loadClients = function (req, res, next) {
    res.render('clients/view-clients', { layout: 'admin-layout', clients: [], title: "List of clients" });
}
module.exports.loadClientTypes = function (req, res, next) {
    mysqlHelper.getClientTypes().then((response) => {
        res.render('clients/client-types', { layout: 'admin-layout', clientType: response, title: "List of clients type" });

    })
}
module.exports.loadClientTypeCreate = function (req, res, next) {

    res.render('clients/client-type-create_edit',
        {
            layout: 'admin-layout',
            title: "Create Clients Type", formId: "formCreateClientType", clientType: {},
        });
}
module.exports.processCreateClientType = function (req, res, next) {
    const { typeName } = req.body;
    mysqlHelper.createClientType(typeName).then(() => {
        res.status(200).json({ status: true, message: "Client type " + typeName + " created succesfully" })
    })
}
