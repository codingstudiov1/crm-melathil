const { PENDING_STATUS, ACTIVE_STATUS, RESIGN_STATUS, REJECT_STATUS, USER_TYPES } = require("../config/strings");
const clientsHelper = require("../helpers/clients-helper");
const userHelpers = require("../helpers/user-helpers");
const moment = require('moment');
const enquiryHelpers = require("../helpers/enquiry-helpers");

const extra = { layout: 'admin-layout', route: 'admin', moment };

module.exports.loadAdminDashboard = async function (req, res, next) {

    let counts = {};
    try {

        counts.enquiryCount = await enquiryHelpers.getCount({ enq_date: { $lte: moment().startOf('month'), $lte: moment().endOf('month') } })
        counts.closedCount = await enquiryHelpers.getCount({ enq_date: { $lte: moment().startOf('month'), $lte: moment().endOf('month') }, enq_closed: true, enq_failed: false })
        counts.usersCount = await userHelpers.getCount({ user_status: ACTIVE_STATUS });

        res.render('admin/admin-dashboard', { ...extra, counts });


    } catch (error) {
        console.log(error);
    }
}
module.exports.loadPendingRequests = function (req, res, next) {
    userHelpers.getUsersByStatus(PENDING_STATUS).then((requests) => {
        res.render('admin/pending-requests', { ...extra, pendingRequests: requests })
    })

}
module.exports.loadApproveEmployees = function (req, res, next) {
    let userId = req.params.id;
    userHelpers.getSingleUser({ _id: userId, user_status: PENDING_STATUS }).then((user) => {
        req.session.approveUserId = userId;
        res.render('admin/approve-user', { ...extra, types: USER_TYPES, user })
    })
}
module.exports.processApproveUser = function (req, res, next) {
    let userId = req.session.approveUserId;
    req.session.approveUserId = null;
    let data = req.body;
    data.user_status = ACTIVE_STATUS;
    userHelpers.updateUsers(userId, data).then(() => {
        res.status(200).json({ status: true, message: "User approved" });
    })

}
module.exports.loadWorkingEmployees = function (req, res, next) {
    userHelpers.getUsersByStatus(ACTIVE_STATUS).then((requests) => {
        res.render('admin/employees', { ...extra, employees: requests })
    })

}
module.exports.loadResignedEmployees = (req, res, next) => {
    userHelpers.getUsersByStatus(RESIGN_STATUS).then((response) => {
        res.render('admin/employees', { ...extra, employees: response })
    })
}
module.exports.loadRejectedEmployees = (req, res, next) => {
    userHelpers.getUsersByStatus(REJECT_STATUS).then((response) => {
        res.render('admin/employees', { ...extra, employees: response })
    })
}

module.exports.loadClients = async (req, res, next) => {
    let clients = await clientsHelper.loadClients();
    res.render('admin/clients-list', { ...extra, clients, title: "List of Clients" });
}
module.exports.loadClientTypes = (req, res, next) => {
    clientsHelper.getClientTypes().then((response) => {
        res.render('clients/client-types', { ...extra, clientType: response, title: "List of clients type" });
    })
}
module.exports.loadClientTypeCreate = (req, res, next) => {
    res.render('clients/client-type-create_edit', { ...extra, title: "Create Clients Type", formId: "formCreateClientType", clientType: {}, });
}
module.exports.processCreateClientType = (req, res, next) => {
    const data = req.body;
    clientsHelper.createClientType(data).then(() => {
        res.status(200).json({ status: true, message: "Client type " + data.type_name + " created succesfully" })
    })
}
module.exports.loadCreateClient = (req, res, next) => {
    clientsHelper.getClientTypes().then((clientTypes) => {
        res.render("clients/create_edit", { ...extra, clientTypes, clientData: {}, title: 'Create client', formId: 'formCreateClient', action: "/admin/clients/create" });
    })
}
module.exports.processCreateClient = (req, res, next) => {
    let data = req.body;
    clientsHelper.createClient(data).then(() => {
        res.redirect('/admin/clients')
    }).catch(err => {
        console.log(err);
    })
};
module.exports.loadEditClient = async (req, res, next) => {
    const clientId = req.params.id;
    const title = "Modify Client Details";
    const formId = "formEditClient";
    const action = "/admin/clients/edit/" + clientId;
    const clientData = await clientsHelper.getClientDetails(clientId);
    console.log(clientData._doc)
    req.session.clientId = clientId;
    const clientTypes = await clientsHelper.getClientTypes();

    res.render("clients/create_edit", { ...extra, title, formId, action, clientData, clientTypes });
}
module.exports.processEditClient = async (req, res, next) => {
    let clientId = req.session.clientId;
    let data = req.body;
    clientsHelper.modifyClient(clientId, data).then(() => {
        res.redirect('/admin/clients')
    })
}
module.exports.processDeleteClient = async (req, res, next) => {
    let clientId = req.params.id;
    clientsHelper.deleteClient(clientId).then(() => res.redirect("/admin/clients"));
};
module.exports.loadEmployeeProfile = (req, res, next) => {

}
module.exports.loadOpenedEnquiries = (req, res, next) => {

}
module.exports.loadAllEnquiries = (req, res, next) => {

}
module.exports.loadClosedEnquiries = (req, res, next) => {

}
module.exports.loadEnquiryDetails = (req, res, next) => {

}
module.exports.loadCloseEnquiry = (req, res, next) => {

}
module.exports.processCloseEnquiry = (req, res, next) => {

}
module.exports.loadCreateManager = (req, res, next) => {

}
module.exports.processCreateManager = (req, res, next) => {

}
module.exports.loadEditManager = (req, res, next) => {

}
module.exports.processEditManager = (req, res, next) => {

}
module.exports.processDeleteManager = (req, res, next) => {

}
