const mongoose = require("mongoose");
const adminModel = require("../models/admin");
const Promise = require("promise");
const bcrypt = require("bcryptjs");

// Models
const Admin = require("../models/admin");

module.exports = {
  createAdmin: async (adminData) => {
    adminData.password = await bcrypt.hash(adminData.password, 10);
    return new Promise((resolve, reject) => {
      const admin = new Admin(adminData);
      admin.save().then((result) => {
        resolve({ status: true, message: "Admin Created Succesfully" });
      });
    });
  },
  getLogin: (data) => {
    return new Promise((resolve, reject) => {
      Admin.findOne({ username: data.username }).then(async (result) => {
        if (result) {
          let passwordTrue = await bcrypt.compare(
            data.password,
            result.password
          );
          if (passwordTrue) {
            resolve({ status: true, message: "Authentication succesfull" });
          } else {
            reject({ status: false, message: "Invalid password" });
          }
        } else {
          reject({ status: false, message: "Invalid username" });
        }
      });
    });
  },
};
