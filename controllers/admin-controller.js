const { USER_TYPES } = require('../config/strings');
const mysqlHelper = require('../helpers/mysql-helper');
const moment = require('moment');
const countsHelper = require('../helpers/counts-helper');


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

module.exports.loadClients = async (req, res, next) => {

    let clients = await mysqlHelper.getClients();
    res.render('admin/clients-list', { layout: 'admin-layout', clients, title: "List of clients" });
}
module.exports.loadEditClient = async (req, res, next) => {
    const clientId = req.params.id;
    const title = "Modify Client Details";
    const formId = "formEditClient";
    const action = "/admin/clients/edit/" + clientId;
    const clientData = await mysqlHelper.getClientDetails(clientId);
    req.session.clientId = clientId;
    const clientTypes = await mysqlHelper.getClientTypes();
    res.render("clients/create_edit", { layout: 'dashboard-layout', title, formId, action, clientData, clientTypes });
};
module.exports.processEditClient = async (req, res, next) => {
    let clientId = req.session.clientId;
    let data = req.body;
    mysqlHelper.modifyClientDetails(clientId, data).then(() => {
        res.redirect('/admin/clients')
    })
};
module.exports.processDeleteClient = async (req, res, next) => {
    let clientId = req.params.id;
    clientHelper
        .deleteClient(clientId)
        .then(() => res.redirect("/dashboard/clients"));
};

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
module.exports.loadApproveEmployees = function (req, res, next) {
    let userId = req.params.id;
    mysqlHelper.getPendingUserDetails(userId).then((user) => {
        req.session.approveUserId = userId;
        res.render('admin/approve-user', { layout: 'admin-layout', types: USER_TYPES, user, moment })
    })
}

module.exports.processApproveUser = function (req, res, next) {
    let userId = req.session.approveUserId;
    req.session.approveUserId = null;
    let data = req.body;
    mysqlHelper.approveUser(userId, data).then(() => {
        res.status(200).json({ status: true, message: "User approves" });
    })

}

module.exports.loadEmployeeProfile = async (req, res, next) => {
    let empId = req.params.id;
    let monthStart = moment().startOf('month').format('YYYY-MM-DD');
    let monthEnd = moment().endOf('month').format('YYYY-MM-DD');
    let enquiriesCount = countsHelper.getEnquiriesCountByUserAndDate(empId, monthStart, monthEnd);
    res.render('admin/employee-profile', { layout: 'admin-layout', enquiriesCount });

}
module.exports.loadOpenedEnquiries = async (req, res, next) => {
    let enquiries = await mysqlHelper.getOpenedEnquiries();
    console.log(enquiries)
    res.render('admin/enquiries', { layout: 'admin-layout', enquiries, moment, title: 'Opened Enquiries' });
}

module.exports.loadAllEnquiries = async (req, res, next) => {
    let enquiries = await mysqlHelper.getAllEnquiries();
    res.render('admin/enquiries', { layout: 'admin-layout', enquiries, moment, title: 'All Enquiries' })
}
module.exports.loadClosedEnquiries = async (req, res, next) => {
    let enquiries = await mysqlHelper.getClosedEnquiries();
    res.render('admin/enquiries', { layout: 'admin-layout', enquiries, moment, title: 'Closed Enquiries' })
}
module.exports.loadEnquiryDetails = async (req, res, next) => {
    let id = req.params.id;
    let enquiries = await mysqlHelper.getEnquiryDetails(id);
    req.session.enquirySession = enquiries;
    console.log(enquiries);
    res.render('admin/view-enquiry-details', { layout: 'admin-layout', enq: enquiries, moment, title: 'Enquiry Details' })
}
module.exports.loadCloseEnquiry = (req, res, next) => {
    let enquiry = req.session?.enquirySession;
    console.log(enquiry);
    if (enquiry == undefined) {
        res.redirect('/admin/enquiries')
    }
    else {
        res.render('admin/close-enquiry', { layout: 'admin-layout', enquiry: enquiry.enquiry })
    }
}

module.exports.processCloseEnquiry = (req, res, next) => {

    let enquiryId = req.session?.enquirySession?.enquiry?.id;
    req.session.enquirySession = null;
    console.log(enquiryId);
    if (enquiryId == undefined) {
        res.redirect('/admin/enquiries')
    }
    else {
        let data = req.body;
        console.log(data);
        mysqlHelper.closeEnquiry(enquiryId, data).then(() => {
            res.redirect('/admin/enquiries/' + enquiryId);
        })
    }
}
module.exports.loadCreateManager = (req, res, next) => {
    mysqlHelper.getManagers().then(managers => {
        res.render('admin/create-manager', { layout: 'admin-layout', action: '/admin/create-manager', managers, title: 'Create Manager', manager: {} });
    })
}
module.exports.processCreateManager = (req, res, next) => {
    let data = req.body;
    mysqlHelper.createManager(data).then((response) => {
        res.redirect('/admin/create-manager');
    })
}
module.exports.loadEditManager = (req, res, next) => {
    let managerId = req.params.id;
    req.session.manager = managerId;
    mysqlHelper.getManagerDetails(managerId).then(manager => {
        mysqlHelper.getManagers().then(managers => {
            res.render('admin/create-manager', { layout: 'admin-layout', action: '/admin/edit-manager', managers, title: 'Edit Manager', manager: manager[0] });
        })
    })

}
module.exports.processEditManager = (req, res, next) => {
    let managerId = req.session.manager
    let data = req.body;
    mysqlHelper.updateManagerDetails(managerId, data).then((response) => {
        res.redirect('/admin/create-manager');
    })
}