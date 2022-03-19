
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

