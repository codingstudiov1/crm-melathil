const Promise = require("promise");
const bcrypt = require("bcryptjs");
const instantHelper = require('../helpers/instant-helers');
// Models
const Admin = require("../models/admin-model");
const Users = require("../models/user-model");

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
  
  createUser: (userData) => {
    return new Promise((resolve, reject) => {
      instantHelper.checkDuplicateMobileNumber(userData.phone)
        .then((result) => {
          return instantHelper.checkDuplicateEmail(userData.email);
        })
        .then(() => {
          const user = new Users(userData);
          user.save().then((result) => {
            if (result) {
              resolve({result});
            } else {
              reject({
                status: false,
                message:
                  "User creation failed because server error !!..Try again later",
              });
            }
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
