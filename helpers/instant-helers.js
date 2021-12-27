const Promise = require("promise");
const bcrypt = require("bcryptjs");
const collections = require("../config/collections");

// Models
const Admin = require("../models/admin-model");
const Users = require("../models/user-model");

module.exports = {
  generateMemberId: () => {
    var rn = require("random-number");
    var options = {
      min: 100000,
      max: 999999,
      integer: true,
    };
    var id = "" + rn(options).toString();
    console.log(id);
    return new Promise((resolve, reject) => {
      Users.findOne({ userId: id }).then((result) => {
        console.log(result);
        if (result) {
          this();
        } else {
          resolve(id);
        }
      });
    });
  },
  checkDuplicateMobileNumber: (number) => {
    return new Promise((resolve, reject) => {
      Users.findOne({ phone: number }).then((result) => {
        if (result) {
          reject({
            status: false,
            message: "User with same mobile number exist",
          });
        } else {
          resolve({ status: true, message: "No user with the mobile number" });
        }
      });
    });
  },
  checkDuplicateEmail: function (emailAddress) {
    return new Promise((resolve, reject) => {
      Users.findOne({ email: emailAddress }).then((result) => {
        if (result) {
          reject({
            status: false,
            messsage: "User with same email exist",
          });
        } else {
          resolve({ status: true, message: "No user with the email" });
        }
      });
    });
  },
};
