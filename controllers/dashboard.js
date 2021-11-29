const helpers = require("../helpers/helpers");
const clientHelper = require("../helpers/clients-helper");
const enquiriesHelper = require("../helpers/enquiries-helper");
const strings = require("../config/strings");
const { CLIENT_STATUS, CLIENT_TEMPARATURE } = require("../config/strings");
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
  viewData.typeData = {};
  viewData.hide = "";
  viewData.title = "Create usertype";
  viewData.formAction = "/admin/usertypes/create";
  res.render("usertypes/create-edit-usertype", viewData);
};
module.exports.loadUserTypesModify = async (req, res, next) => {
  const typeId = req.params.typeId;
  viewData.hide = "readonly";
  viewData.typeData = await adminHelper.getUserType(typeId);
  viewData.title = "Modify usertype";
  viewData.formAction = "/admin/usertypes/modify/" + typeId;
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
      res.redirect("/admin/usertypes");
    })
    .catch((error) => {
      res.status(304).json(error);
    });
};
module.exports.processUserTypesModify = (req, res, next) => {
  const userTypeId = req.params.typeId;
  const { usertype, ...rest } = req.body;
  let data = {
    usertype,
    permissions: rest,
  };
  adminHelper
    .modifyUserType(userTypeId, data)
    .then(() => {
      res.redirect("/admin/usertypes");
    })
    .catch((error) => {
      res.status(304).json(error);
    });
};
module.exports.processUserTypesDelete = (req, res, next) => {
  const userTypeId = req.params.typeId;
  adminHelper
    .deleteUserType(userTypeId)
    .then(() => {
      res.redirect("/admin/usertypes");
    })
    .catch((error) => {
      res.status(304).json(error);
    });
};
module.exports.loadEnquiries = (req, res, next) => {
  viewData.title = "Enquiries";
  req.session.userSession = {

  }
  let userSession = req.session.userSession;
  enquiriesHelper.getEnquiries(userSession._id).then((result) => {
    console.log(result);
    viewData.enquiries = result;
    res.render('enquiries/view-enquiries', viewData);
  })
}
module.exports.loadCreateEnquiries = (req, res, next) => {
  viewData.title = "Create Enquiry"
  viewData.action = "/dashboard/enquiries/create";
  viewData.status = CLIENT_STATUS;
  viewData.temp = CLIENT_TEMPARATURE;
  res.render('enquiries/add_edit_enquiries', viewData);
}