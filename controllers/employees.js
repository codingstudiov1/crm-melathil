module.exports.verifyLogin = (req, res, next) => {
  //   next();
  req.session.employeeSession = {
    _id: "619e554bd279dfb211c0338b",
    employeeId: "771653",
    firstName: "Sindhu",
    lastName: "S",
    address: "Sindhu",
    phone: "9961793300",
    email: "jithins41@gmail.com",
    dob: "1985-01-01T00:00:00.000Z",
    gender: "Female",
    password: "$2a$10$0hdnYBJEQgLyzzIcZRGeY.Nd2rWfjVh5x.HKJj5A1VKH8VMmXbcbC",
    __v: 0,
    active: true,
  };
  if (req.session.employeeSession) {
    next();
  } else {
    res.redirect("/login");
  }
};

module.exports.loadEmployeeDashboard = (req, res, next) => {
  const employee = req.session.employeeSession;
  let currentDate = new Date();
  res.render("employees/dashboard", {
    layout: "admin-layout",
    user: employee,
  });
};
module.exports.loadEmployeeEnquiries = (req, res, next) => {};
module.exports.loadCreateEnquiries = (req, res, next) => {};
module.exports.processCreateEnquiries = (req, res, next) => {
  let enqData = req.body;
  const empId = req.session.employeeSession._id;
};
