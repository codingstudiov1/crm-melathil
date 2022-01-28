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

module.exports.loadEnquiries = async (req, res, next) => {
  viewData.title = "Enquiries";
  let userSession = req.session.userSession;
  let enquiries = await mysqlHelper.getEnquiryByUser(2);
  res.render("enquiries/view-enquiries", { layout: 'dashboard-layout', enquiries, title: "Enquiries", moment });
};
module.exports.loadCreateEnquiries = async (req, res, next) => {
  const clients = await mysqlHelper.getClients();
  const title = "Create Enquiry";
  const action = "/dashboard/enquiries/create";
  const status = CLIENT_STATUS;
  const temp = CLIENT_TEMPARATURE;
  res.render("enquiries/add_edit_enquiries", { layout: 'dashboard-layout', clients, title, action, status, temp });
};
module.exports.processCreateEnquiry = (req, res, next) => {
  let enquiryData = req.body;
  enquiryData.user = 2;
  mysqlHelper.createEnquiry(enquiryData).then(() => {
    res.redirect('/dashboard/enquiries');
  })

};
module.exports.loadViewEnquiries = (req, res, next) => {
  let enqId = req.params.id;
  req.session.enquiryId = enqId;
  let user = 2;
  viewData.title = "Enquiry Details ";
  mysqlHelper.getEnquiryDetailsByUser(enqId, user).then((details) => {
    res.render("enquiries/view_enuiry_details", { layout: 'dashboard-layout', title: "Enquiry Details", enq: details, moment });
  })
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

  if (req.session.enquiryId == undefined) res.redirect('/dashboard/enquiries')
  else res.render("enquiries/add_edit_updates", { layout: 'dashboard-layout', title: "Update Enquiry", action: "/dashboard/enquiries/update/", status: CLIENT_STATUS, temp: CLIENT_TEMPARATURE });
};
module.exports.processEnquiryUpdateCreate = (req, res, next) => {
  let enqId = req.session.enquiryId;
  let data = req.body;
  mysqlHelper
    .updateEnquiry(enqId, data)
    .then(() => res.redirect("/dashboard/enquiries/view/" + enqId));
};
module.exports.loadEnquiryReportRequest = async (req, res, next) => {
  let user = 2;//To be replaced by session value;
  let quiries = req.query;
  console.log(quiries);
  let clients = await mysqlHelper.getClients();
  let temparature = CLIENT_TEMPARATURE;
  let status = CLIENT_STATUS;

  res.render('reports/client-enquiry-report', { layout: 'dashboard-layout', title: "Get Report", status, temparature, clients });

}

// module.exports.processEnquiryReportRequest = (req, res, next) => {

// }