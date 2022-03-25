const { PENDING_STATUS, ACTIVE_STATUS, RESIGN_STATUS, REJECT_STATUS, USER_TYPES, CLIENT_STATUS, CLIENT_TEMPARATURE, ENQUIRY_PROIRITY } = require("../config/strings");
const clientsHelper = require("../helpers/clients-helper");
const userHelpers = require("../helpers/user-helpers");
const moment = require('moment');
const enquiryHelpers = require("../helpers/enquiry-helpers");
const managerHelpers = require("../helpers/manager-helpers");
const { ObjectId } = require("mongoose").Types;
const bcrypt = require('bcryptjs');

const extra = { layout: 'admin-layout', route: 'admin', moment, user: {} };

module.exports.verifyLogin = (req, res, next) => {
    if (req.session.adminSession) {
        extra.user = req.session.adminSession;
        next();
    }
    else {
        res.redirect('/');
    }
}

module.exports.loadAdminDashboard = async function (req, res, next) {

    let counts = {};
    try {

        counts.enquiryCount = await enquiryHelpers.getCount({ enq_date: { $lte: moment().startOf('month'), $lte: moment().endOf('month') } })
        counts.closedCount = await enquiryHelpers.getCount({ enq_date: { $lte: moment().startOf('month'), $lte: moment().endOf('month') }, enq_closed: true, enq_failed: { $ne: true } })   //false
        counts.usersCount = await userHelpers.getCount({ user_status: ACTIVE_STATUS });
        counts.failedCount = await enquiryHelpers.getCount({ enq_date: { $lte: moment().startOf('month'), $lte: moment().endOf('month') }, enq_closed: true, enq_failed: true });
        counts.managersCount = await managerHelpers.getCount();
        counts.showroomStaffCount = await userHelpers.getCount({ user_field: "SHOWROOM" });
        counts.fieldStaffCount = await userHelpers.getCount({ user_field: "FIELD" });
        counts.closeRequestCount = await enquiryHelpers.getCloseRequestCount();
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
        res.render('admin/approve-user', { ...extra, types: USER_TYPES, user, action: '/admin/approve-user' })
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
module.exports.loadEmployeeProfile = async (req, res, next) => {
    let empId = req.params.id;
    req.session.user = empId;
    let month = req.query.month
    month = month === undefined || month === '' ? moment() : moment(month)
    let monthStart = moment(month).startOf('month').format('YYYY-MM-DD');
    let monthEnd = moment(month).endOf('month').format('YYYY-MM-DD');
    let counts = {};
    let userDetails = await userHelpers.getSingleUser(empId);
    console.log(userDetails);
    counts.activeCount = await enquiryHelpers.getCount({ enq_date: { $gte: monthStart, $lte: monthEnd }, enq_user: empId });
    counts.closedCount = await enquiryHelpers.getCount({ enq_date: { $gte: monthStart, $lte: monthEnd }, enq_user: empId, enq_closed: true, enq_failed: { $ne: true } });
    counts.failedCount = await enquiryHelpers.getCount({ enq_date: { $gte: monthStart, $lte: monthEnd }, enq_user: empId, enq_closed: true, enq_failed: true });
    counts.activeCountAll = await enquiryHelpers.getCount({ enq_user: empId });
    counts.closedCountAll = await enquiryHelpers.getCount({ enq_user: empId, enq_closed: true, enq_failed: { $ne: true } });
    counts.failedCountAll = await enquiryHelpers.getCount({ enq_user: empId, enq_closed: true, enq_failed: true });
    res.render('admin/employee-profile', { ...extra, counts, month, userDetails });

}
module.exports.loadEmployeeEnquiries = async (req, res, next) => {
    let empId = req.params.id;
    let monthStart = moment().startOf('month').format('YYYY-MM-DD');
    let monthEnd = moment().endOf('month').format('YYYY-MM-DD');
    let counts = {};
    let classA = await enquiryHelpers.getEnquiries({ enq_user: empId, enq_class: 'Class A' });
    let classB = await enquiryHelpers.getEnquiries({ enq_user: empId, enq_class: 'Class B' });
    let classC = await enquiryHelpers.getEnquiries({ enq_user: empId, enq_class: 'Class C' });
    res.render('admin/enquiries', { ...extra, classA, classB, classC, title: 'Enquiries of ' });

}
module.exports.loadOpenedEnquiries = (req, res, next) => {

}
module.exports.loadAllEnquiries = async (req, res, next) => {
    let enquiries = await enquiryHelpers.getEnquiries({});
    res.render('admin/enquiries', { ...extra, enquiries, title: 'All Enquiries' })
}
module.exports.loadEnquiryDetails = async (req, res, next) => {
    let id = req.params.id;
    let enquiries = await enquiryHelpers.getEnquiries({ _id: ObjectId(id) });
    enquiries = enquiries.length > 0 ? enquiries[0] : {};
    req.session.enquirySession = enquiries;
    console.log(enquiries);
    res.render('enquiries/view_enuiry_details', { ...extra, enq: enquiries, title: 'Enquiry Details' })
}
module.exports.loadEnquiryModify = async (req, res, next) => {
    let id = req.params.id;
    let clients = await clientsHelper.loadClients();
    let enquiry = await enquiryHelpers.getEnquiries({ _id: ObjectId(id) });
    enquiry = enquiry.length > 0 ? enquiry[0] : {};
    res.render('enquiries/add_edit_enquiries', { ...extra, enquiry, clients, status: CLIENT_STATUS, enqClass: ENQUIRY_PROIRITY, temp: CLIENT_TEMPARATURE, title: "Modify Enquiry", action: "/admin/modify-enquiry" })
}
module.exports.loadClosedEnquiries = async (req, res, next) => {
    let enquiries = await enquiryHelpers.getEnquiries({ enq_closed: true, enq_failed: false }, {});
    res.render('admin/enquiries', { ...extra, enquiries, moment, title: 'Closed Enquiries' })
}
module.exports.loadFailedEnquiries = async (req, res, next) => {
    let enquiries = await enquiryHelpers.getEnquiries({ enq_closed: true, enq_failed: true }, {});
    res.render('admin/enquiries', { ...extra, enquiries, moment, title: 'Failed Enquiries' })
}
module.exports.loadClientDetails = async (req, res, next) => {
    let client = req.params.id;
    client = await clientsHelper.getClientDetails(client);
    let enquiries = await enquiryHelpers.getEnquiries({ enq_client: client }, {});
    res.render('admin/enquiries', { ...extra, enquiries, moment, title: `Enquiries by ${client.client_name} (${client.client_desi})` })
}
module.exports.loadCloseEnquiry = (req, res, next) => {

}
module.exports.processCloseEnquiry = (req, res, next) => {

}
module.exports.loadCreateManager = (req, res, next) => {
    managerHelpers.getManagers().then(managers => {
        res.render('admin/create-manager', { ...extra, action: '/admin/create-manager', title: 'Create Manager', manager: {} });
    })
}
module.exports.loadManagers = async (req, res, next) => {
    const managers = await managerHelpers.getManagers();
    res.render('manager/managers', { ...extra, managers, title: 'Managers', })
}
module.exports.processCreateManager = async (req, res, next) => {
    let data = req.body;
    data.password = await bcrypt.hash(data.password, 10);
    managerHelpers.createManager(data).then(() => {
        res.redirect('/admin/managers');
    })
}
module.exports.loadEditManager = async (req, res, next) => {
    let managerId = req.params.id;
    req.session.manager = managerId;
    let managers = await managerHelpers.getManagers();
    managerHelpers.getManagerDetailsById(managerId).then(manager => {
        res.render('admin/create-manager', { ...extra, action: '/admin/edit-manager', managers, title: 'Edit Manager', manager });
    })
}
module.exports.processEditManager = async (req, res, next) => {
    let managerId = req.session.manager
    let data = req.body;
    data.password = data.password == '' ? undefined : await bcrypt.hash(data.password, 10);
    managerHelpers.modifyManager(managerId, data).then(() => {
        res.redirect('/admin/managers');
    })
}
module.exports.processDeleteManager = (req, res, next) => {
    let managerId = req.params.id;
    managerHelpers.deleteManager(managerId).then(() => {
        res.redirect('/admin/managers');
    })
}
module.exports.loadUsersByTypes = (req, res, next) => {
    let type = req.params.type;
    type = type.toUpperCase();
    userHelpers.getUsers({ user_field: type }).then((response) => {
        res.render('admin/users-by-type', { ...extra, title: `${type} staffs`, users: response })
    })
}
module.exports.loadCloseRequests = async (req, res, next) => {
    let pendingPartialClosings = await enquiryHelpers.getCloseRequests();
    res.render('enquiries/close-requests', { ...extra, pendingPartialClosings });
}
module.exports.processApproveCloseEnquiry = async (req, res, next) => {
    let id = req.params.id;
    let closeRequest = await enquiryHelpers.getCloseRequestById(id);
    console.log(closeRequest);
    delete closeRequest._id;
    let close = await enquiryHelpers.createClose(closeRequest);
    await enquiryHelpers.updateClosings(closeRequest.close_enquiry, { enq_partial_closes: close._id });
    await enquiryHelpers.deleteCloseRequest(closeRequest._id);
    if (closeRequest.close_full) {
        await enquiryHelpers.updateEnquiry(closeRequest.close_enquiry, { enq_closed: true });
    }
    res.redirect('/admin/close-requests');
}