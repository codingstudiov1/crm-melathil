const helpers = require("../helpers/helpers");
const clientHelper = require("../helpers/clients-helper");
const enquiriesHelper = require("../helpers/enquiries-helper");
const viewData = { layout: "dashboard-layout" };
// Reject Employee Controller
module.exports.rejectEmployee = (req, res, next) => {
  let id = req.params.id;
  helpers.rejectEmployee(id).then(() => {
    res.redirect("/dashboard/employees/requests");
  });
};
// Get active employees controller
module.exports.activeEmployees = (req, res, next) => {
  helpers.getActiveEmployees().then((employees) => {
    viewData.employees = employees;
    res.render("admin/active-employees", viewData);
  });
};
// View all clients controller
module.exports.allClinets = function (req, res, next) {
  clientHelper.getAllClients().then((result) => {
    viewData.clients = result;
    viewData.title = "List of clients";
    res.render("clients/view-clients", viewData);
  });
};
module.exports.loadCreateClient = function (req, res, next) {
  viewData.title = "Create client";
  viewData.formId = "formCreateClient";
  res.render("clients/create_edit", viewData);
};
module.exports.processCreateClient = function (req, res, next) {
  let custData = req.body;
  console.log(custData);
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
module.exports.loadClientTypes = async function (req, res, next) {
  viewData.title = "Client Types";
  viewData.clientType = await clientHelper.getAllClientTypes();
  res.render("clients/client-types", viewData);
};

module.exports.loadEnquiries = (req, res, next) => {
  viewData.title = "Enquiries";
  req.session.userSession = {

  }
  let userSession = req.session.userSession;
  enquiriesHelper.getEnquiries(userSession._id).then((result) => {
    console.log(result);
    res.render('enquiries/view-enquiries', viewData);
  })
}