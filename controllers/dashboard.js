const helpers = require("../helpers/helpers");
// const clientHelper = require("../helpers/clients-helper");
// const enquiriesHelper = require("../helpers/enquiries-helper");
// const userTypeHelper = require("../helpers/usertype-helper");
const mysqlHelper = require('../helpers/mysql-helper');
const strings = require("../config/strings");
const { CLIENT_STATUS, CLIENT_TEMPARATURE } = require("../config/strings");
const viewData = { layout: "dashboard-layout" };
var moment = require("moment");

module.exports.loadDashHome = (req, res, next) => {
  viewData.user = req.session.userSession;
  viewData.permissions = req.session?.userSession?.usertype?.permissions;
  res.render("admin/home", viewData);
};
//Logout controller
module.exports.processLogout = (req, res, next) => {
  req.session.destroy();
  res.redirect("/");
};


// View all clients controller
module.exports.allClinets = function (req, res, next) {
  mysqlHelper.getClients().then((clients) => {
    res.render("clients/view-clients", { layout: "dashboard-layout", title: "Clients list", clients });
  })
};
module.exports.loadCreateClient = async function (req, res, next) {
  mysqlHelper.getClientTypes().then((clientTypes) => {
    res.render("clients/create_edit", { layout: 'dashboard-layout', clientTypes, clientData: {}, title: 'Create client', formId: 'formCreateClient', action: "/dashboard/clients/create" });
  })
};
module.exports.processCreateClient = function (req, res, next) {
  let data = req.body;
  mysqlHelper.createClient(data).then(() => {
    res.redirect('/dashboard/clients')
  })
};

module.exports.loadEditClient = async (req, res, next) => {
  const clientId = req.params.id;
  const title = "Modify Client Details";
  const formId = "formEditClient";
  const action = "/dashboard/clients/edit/" + clientId;
  const clientData = await mysqlHelper.getClientDetails(clientId);
  req.session.clientId = clientId;
  const clientTypes = await mysqlHelper.getClientTypes();
  res.render("clients/create_edit", { layout: 'dashboard-layout', title, formId, action, clientData, clientTypes });
};
module.exports.processEditClient = async (req, res, next) => {
  let clientId = req.session.clientId;
  let data = req.body;
  mysqlHelper.modifyClientDetails(clientId, data).then(() => {
    res.redirect('/dashboard/clients')
  })
};
module.exports.processDeleteClient = async (req, res, next) => {
  let clientId = req.params.id;
  clientHelper
    .deleteClient(clientId)
    .then(() => res.redirect("/dashboard/clients"));
};

module.exports.loadClientTypeCreate = function (req, res, next) {
  viewData.title = "CREATE CLIENT TYPE";
  viewData.clientType = {};
  viewData.formAction = "/dashboard/clients/client-types/create";
  res.render("clients/client-type-create_edit", viewData);
};
module.exports.processClientTypeCreate = function (req, res, next) {
  let data = req.body;
  // console.log(data)
  clientHelper.createClientType(data).then(() => {
    res.redirect("/dashboard/clients/client-types");
  });
};

module.exports.loadEnquiries = (req, res, next) => {
  viewData.title = "Enquiries";
  let userSession = req.session.userSession;
  enquiriesHelper.getEnquiries(userSession._id).then((result) => {
    viewData.enquiries = result;
    res.render("enquiries/view-enquiries", viewData);
  });
};
module.exports.loadCreateEnquiries = async (req, res, next) => {
  viewData.clients = await clientHelper.getAllClients();
  viewData.title = "Create Enquiry";
  viewData.action = "/dashboard/enquiries/create";
  viewData.status = CLIENT_STATUS;
  viewData.temp = CLIENT_TEMPARATURE;
  res.render("enquiries/add_edit_enquiries", viewData);
};
module.exports.processCreateEnquiry = (req, res, next) => {
  let enquiryData = req.body;
  enquiryData.user = "61abaf9b672ec701ca4a58b1";
  enquiriesHelper
    .createEnquiry(enquiryData)
    .then((resp) => res.redirect("/dashboard/enquiries"));
};
module.exports.loadViewEnquiries = (req, res, next) => {
  let enqId = req.params.id;
  viewData.title = "Enquiry Details ";
  enquiriesHelper.viewEnquiryDetails(enqId).then((resp) => {
    console.log(resp);
    viewData.enq = resp;
    viewData.moment = moment;
    res.render("enquiries/view_enuiry_details", viewData);
  });
};
module.exports.loadAllEnquiries = (req, res, next) => {
  enquiriesHelper.getAllEnquiries().then((data) => {
    viewData.title = "Enquiry Details ";
    viewData.enquiries = data;
    viewData.moment = moment;
    res.render("enquiries/all_enquiries", viewData);
  });
};
module.exports.loadEnquiryUpdateCreate = (req, res, next) => {
  let enqId = req.params.id;
  viewData.title = "Update Enquiry";
  viewData.action = "/dashboard/enquiries/update/" + enqId;
  viewData.status = CLIENT_STATUS;
  viewData.temp = CLIENT_TEMPARATURE;
  res.render("enquiries/add_edit_updates", viewData);
};
module.exports.processEnquiryUpdateCreate = (req, res, next) => {
  let enqId = req.params.id;
  let data = req.body;
  enquiriesHelper
    .updateEnquiry(enqId, data)
    .then(() => res.redirect("/dashboard/enquiries/view/" + enqId));
};
