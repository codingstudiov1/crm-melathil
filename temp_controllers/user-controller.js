
const mysqlHelper = require('../helpers/mysql-helper');
const strings = require("../config/strings");
const { CLIENT_STATUS, CLIENT_TEMPARATURE } = require("../config/strings");
const viewData = { layout: "dashboard-layout" };
var moment = require("moment");
const countsHelper = require("../helpers/counts-helper");
const extra = { route: '/dashboard', layout: 'dashboard-layout' };

module.exports.loadDashHome = async (req, res, next) => {
  let counts = {};
  let userId = 1;
  let today = moment().format('YYYY-MM-DD');
  let monthStart = moment().startOf('month').format('YYYY-MM-DD');
  let monthEnd = moment().endOf('month').format('YYYY-MM-DD');
  counts.monthlyEquiryCount = await countsHelper.getEnquiriesCountByUserAndDate(userId, monthStart, monthEnd);
  counts.monthlyClosedEquiryCount = await countsHelper.getClosedEnquiriesCountByUserAndDate(userId, monthStart, monthEnd);
  counts.monthlyWorkingEquiryCount = await countsHelper.getWorkingEnquiriesCountByUserAndDate(userId, monthStart, monthEnd);


  res.render("employees/dashboard", { layout: 'dashboard-layout', title: 'Dashboard', counts, moment });
};
//Logout controller
module.exports.processLogout = (req, res, next) => {
  req.session.destroy();
  res.redirect("/");
};


// View all clients controller






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
  let enquiries = await mysqlHelper.getEnquiryByUser(1);
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
  enquiryData.user = 1;
  mysqlHelper.createEnquiry(enquiryData).then(() => {
    res.redirect('/dashboard/enquiries');
  })

};
module.exports.loadViewEnquiries = (req, res, next) => {
  let enqId = req.params.id;
  req.session.enquiryId = enqId;
  let user = 1;
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
  let user = 1;//To be replaced by session value;
  let clients = await mysqlHelper.getClients();
  let temparature = CLIENT_TEMPARATURE;
  let status = CLIENT_STATUS;
  res.render('reports/client-enquiry-report', { layout: 'dashboard-layout', title: "Get Report", status, temparature, clients, enquiries: [] });

}
module.exports.processEnquiryReportRequest = async (req, res, next) => {
  let query = req.query;
  let clients = await mysqlHelper.getClients();
  mysqlHelper.filterEnquiries(query).then((response) => {
    console.log(response);
    res.render('reports/client-enquiry-report', { moment, layout: 'dashboard-layout', title: 'Search Report', status: CLIENT_STATUS, temparature: CLIENT_TEMPARATURE, clients, enquiries: response })
  })
}
module.exports.loadTodaysReport = (req, res, next) => {
  let today = moment().format('YYYY-MM-DD');
  console.log(today)
  mysqlHelper.getEmployeeReport(today).then((report) => {
    console.log(report);
    res.render('reports/daily-report', { layout: "dashboard-layout", title: "Daily Report", report, moment, date: today });
  })
};

