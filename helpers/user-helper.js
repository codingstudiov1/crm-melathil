const Enquiries = require("../models/enquiries-model");
const Promise = require("promise");

module.exports = {
  createNewEnquiry: (enqData) => {
    return new Promise((resolve, reject) => {
      var enquiry = new Enquiries(enqData);
      enquiry.save().then((response) => {
        resolve(response);
      });
    });
  },
  getEnquiries: (empId) => {
    return new Promise((resolve, reject) => {
      Enquiries.find({ employeeId: empId }).then((response) => {
        console.log(response);
      });
    });
  },
};
