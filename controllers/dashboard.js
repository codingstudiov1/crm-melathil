const helpers = require("../helpers/helpers");
const clientHelper = require("../helpers/clients-helper");
const enquiriesHelper = require("../helpers/enquiries-helper");
const userTypeHelper = require('../helpers/usertype-helper');
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
  viewData.action = "/dashboard/clients/create"
  viewData.clientData = {};
  res.render("clients/create_edit", viewData);
};
module.exports.processCreateClient = function (req, res, next) {
  let custData = req.body;
  clientHelper.createClient(custData).then(result => res.redirect('/dashboard/clients'))
};
module.exports.loadEditClient = async (req, res, next) => {
  let clientId = req.params.id;
  viewData.title = "Modify Client Details";
  viewData.formId = "formEditClient"
  viewData.action = "/dashboard/clients/edit/" + clientId;
  viewData.clientData = await clientHelper.getClientDetails(clientId);
  viewData.clientTypes = await clientHelper.getAllClientTypes();
  res.render("clients/create_edit", viewData);
}
module.exports.processEditClient = async (req, res, next) => {
  let clientId = req.params.id;
  let data = req.body;
  clientHelper.modifyClient(clientId, data).then(() => res.redirect('/dashboard/clients'));
}
module.exports.processDeleteClient = async (req, res, next) => {
  let clientId = req.params.id;
  clientHelper.deleteClient(clientId).then(() => res.redirect('/dashboard/clients'));
}
module.exports.loadEditClient = async (req, res, next) => {
  let clientId = req.params.id;
  viewData.title = "Modify Client Details";
  viewData.formId = "formEditClient"
  viewData.action = "/dashboard/clients/edit/" + clientId;
  viewData.clientData = await clientHelper.getClientDetails(clientId);
  viewData.clientTypes = await clientHelper.getAllClientTypes();
  res.render("clients/create_edit", viewData);
}
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
    viewData.formAction = "/dashboard/clients/client-types/modify/" + id;
    res.render("clients/client-type-create_edit", viewData);
  });
};
module.exports.processClientTypeModify = async (req, res, next) => {
  let id = req.params.id;
  let data = req.body;
  clientHelper.updateClientType(id, data).then((result) => {
    res.redirect("/dashboard/clients/client-types");
  });
};
module.exports.processClientTypeDelete = async (req, res, next) => {
  let id = req.params.id;
  clientHelper.deleteClientType(id).then(() => {
    res.redirect("/dashboard/clients/client-types");
  });
};
module.exports.loadUserTypes = (req, res, next) => {
  userTypeHelper.getAllUserTypes().then((result) => {
    viewData.userTypes = result;
    viewData.title = "User Types";
    res.render("usertypes/user-types", viewData);
  });
};
module.exports.loadUserTypesCreate = (req, res, next) => {
  viewData.typeData = {};
  viewData.hide = "";
  viewData.title = "Create usertype";
  viewData.formAction = "/dashboard/usertypes/create";
  res.render("usertypes/create-edit-usertype", viewData);
};
module.exports.loadUserTypesModify = async (req, res, next) => {
  const typeId = req.params.typeId;
  viewData.hide = "readonly";
  viewData.typeData = await userTypeHelper.getUserType(typeId);
  viewData.title = "Modify usertype";
  viewData.formAction = "/dashboard/usertypes/modify/" + typeId;
  res.render("usertypes/create-edit-usertype", viewData);
};
module.exports.processUserTypesCreate = (req, res, next) => {
  const { usertype, ...rest } = req.body;
  let data = {
    usertype,
    permissions: rest,
  };
  userTypeHelper
    .createNewUserType(data)
    .then((result) => {
      res.redirect("/dashboard/usertypes");
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
  userTypeHelper
    .modifyUserType(userTypeId, data)
    .then(() => {
      res.redirect("/dashboard/usertypes");
    })
    .catch((error) => {
      res.status(304).json(error);
    });
};
module.exports.processUserTypesDelete = (req, res, next) => {
  const userTypeId = req.params.typeId;
  userTypeHelper
    .deleteUserType(userTypeId)
    .then(() => {
      res.redirect("/dashboard/usertypes");
    })
    .catch((error) => {
      res.status(304).json(error);
    });
};
module.exports.loadEnquiries = (req, res, next) => {
  viewData.title = "Enquiries";
  req.session.userSession = {
    "_id" : "61b05f9ca579348f49088687",
    "employeeId" : "449641",
    "firstName" : "Sreevidhya",
    "lastName" : "S",
    "address" : "Ezhamkulam",
    "phone" : "9961413300",
    "email" : "e2@melathilgroup.com",
    "dob" : Date("1985-01-01T00:00:00.000Z"),
    "gender" : "Female",
    "status" : "active",
    "password" : "1234567",
    "__v" : 0
  }
  let userSession = req.session.userSession;
  enquiriesHelper.getEnquiries(userSession._id).then((result) => {
    viewData.enquiries = result;
    res.render('enquiries/view-enquiries', viewData);
  })
}
module.exports.loadCreateEnquiries = async (req, res, next) => {
  viewData.clients = await clientHelper.getAllClients();
  viewData.title = "Create Enquiry"
  viewData.action = "/dashboard/enquiries/create";
  viewData.status = CLIENT_STATUS;
  viewData.temp = CLIENT_TEMPARATURE;
  res.render('enquiries/add_edit_enquiries', viewData);
}
module.exports.processCreateEnquiry = (req, res, next) => {
  let enquiryData = req.body;
  enquiryData.user = "61abaf9b672ec701ca4a58b1";
  enquiriesHelper.createEnquiry(enquiryData).then(resp => res.redirect('/dashboard/enquiries'))
}
module.exports.loadViewEnquiries = (req, res, next) => {
  let enqId = req.params.id;

  enquiriesHelper.viewEnquiryDetails(enqId).then(resp => {
    console.log(resp)
    viewData.title = 'Enquiry Details ';
    viewData.enq = resp;
    res.render('enquiries/view_enuiry_details', viewData);
  });
}