const helpers = require("../helpers/helpers");
const viewData = { layout: "admin-layout" };
module.exports = {
  rejectEmployee: (req, res, next) => {
    let id = req.params.id;
    helpers.rejectEmployee(id).then(() => {
      res.redirect("/admin/employees/requests");
    });
  },
  activeEmployees: (req, res, next) => {
    helpers.getActiveEmployees().then((employees) => {
      viewData.employees = employees;
      res.render("admin/active-employees", viewData);
    });
  },
};
