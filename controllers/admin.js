const helpers = require("../helpers/helpers");
const clientHelper = require("../helpers/clients-helper");
const viewData = { layout: "admin-layout" };
// Reject Employee Controller
module.exports.rejectEmployee = (req, res, next) => {
  let id = req.params.id;
  helpers.rejectEmployee(id).then(() => {
    res.redirect("/admin/employees/requests");
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
  viewData.formAction = "/admin/clients/client-types/create";
  res.render("clients/client-type-create_edit", viewData);
};
module.exports.processClientTypeCreate = function (req, res, next) {
  let data = req.body;
  // console.log(data)
  clientHelper.createClientType(data).then(() => {
    res.redirect("/admin/clients/client-types");
  });
};
module.exports.loadClientTypes =async  function (req, res, next) {
  viewData.title = "Client Types";
  viewData.clientType = await clientHelper.getAllClientTypes();
  res.render("clients/client-types", viewData);
};
