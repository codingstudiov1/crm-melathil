const helpers = require("../helpers/helpers");
const clientHelper = require("../helpers/clients-helper");
const adminHelper = require("../helpers/admin-helper");
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
module.exports.loadCreateClient = async function (req, res, next) {
  viewData.clientTypes = await clientHelper.getAllClientTypes();
  viewData.title = "Create client";
  viewData.formId = "formCreateClient";
  viewData.clientData = {};
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
module.exports.loadClientTypes = async function (req, res, next) {
  viewData.title = "Client Types";
  viewData.clientType = await clientHelper.getAllClientTypes();
  res.render("clients/client-types", viewData);
};
module.exports.loadClientTypeModify = async (req, res, next) => {
  let id = req.params.id;
  clientHelper.loadClientType(id).then((result) => {
    viewData.title = "Modify Client Types";
    viewData.clientType = result;
    viewData.formAction = "/admin/clients/client-types/modify/" + id;
    res.render("clients/client-type-create_edit", viewData);
  });
};
module.exports.processClientTypeModify = async (req, res, next) => {
  let id = req.params.id;
  let data = req.body;
  clientHelper.updateClientType(id, data).then((result) => {
    res.redirect("/admin/clients/client-types");
  });
};
module.exports.processClientTypeDelete = async (req, res, next) => {
  let id = req.params.id;
  clientHelper.deleteClientType(id).then(() => {
    res.redirect("/admin/clients/client-types");
  });
};
module.exports.loadUserTypes = (req, res, next) => {
  adminHelper.getAllUserTypes().then((result) => {
    viewData.userTypes = result;
    viewData.title = "User Types";
    res.render("usertypes/user-types", viewData);
  });
};
module.exports.loadUserTypesCreate = (req, res, next) => {
  viewData.title = "Create usertype";
  res.render("usertypes/create-edit-usertype", viewData);
};
module.exports.processUserTypesCreate = (req, res, next) => {
  const { usertype, ...rest } = req.body;
  let data = {
    usertype,
    permissions: rest,
  };
  adminHelper
    .createNewUserType(data)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(304).json(error);
    });
  // viewData.title = "Create usertype";
  // res.render("usertypes/create-edit-usertype", viewData);
};
