const Promise = require("promise");
const bcrypt = require("bcryptjs");
const instantHelper = require("../helpers/instant-helers");
// Models
const Admin = require("../models/admin-model");
const Users = require("../models/user-model");
const { db } = require("../models/admin-model");

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
      instantHelper
        .checkDuplicateMobileNumber(userData.phone)
        .then((result) => {
          return instantHelper.checkDuplicateEmail(userData.email);
        })
        .then(async () => {
          console.log(userData);
          let employeeId = await instantHelper.generateMemberId();
          userData.employeeId = employeeId;
          console.log(userData.employeeId);
          const user = new Users(userData);
          user.save().then((result) => {
            if (result) {
              resolve({ result });
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
  getUserLogin: (userInfo) => {
    return new Promise((resolve, reject) => {
      Users.findOne({
        $or: [{ phone: userInfo.username }, { email: userInfo.username }],
      }).then(async (result) => {
        console.log(result);
        if (result) {
          if (!result.status && result?.rejected) {
            reject({
              status: false,
              message: "No employees registered with the given..",
            });
          } else if (result?.status && result?.resigned) {
            reject({
              status: false,
              message: "Currently you have no permission to access the website",
            });
          } else if (!result?.status) {
            reject({
              status: false,
              message: "Your verification is pending..Kindly wait for a while",
            });
          } else if (result.status && !result?.rejected && !result?.resigned) {
            const state = await bcrypt.compare(
              userInfo.password,
              result.password
            );
            if (!state) {
              reject({
                status: false,
                message: "Invalid password..",
              });
            } else {
              delete result.password;
              resolve({
                status: true,
                message: "Authentication succesful",
                user: result,
              });
            }
          } else {
            reject({
              status: false,
              message: "Invalid operation detected",
            });
          }
        } else {
          reject({
            status: false,
            message: "No employees registered with the given..",
          });
        }
      });
    });
  },
  getPendingRequests: () => {
    return new Promise((resolve, reject) => {
      Users.find({
        active: {
          $ne: true,
        },
        rejected:{
          $ne:true
        },
        resigned:{
          $ne:true
        }
      }).then((resonse) => {
        resolve(resonse);
      });
    });
  },
  getActiveEmployees:()=>{
    return new Promise((resolve,reject)=>{
      Users.find({
        active:true,
        rejected:{
          $ne:true
        },
        resigned:{
          $ne:true
        }
      }).then((result)=>{
        resolve(result)
      })
    })
  },
  approveEmployee: (id) => {
    return new Promise((resolve, reject) => {
      Users.updateOne({ employeeId: id }, { active: true }).then((user) => {
        console.log(user);
        resolve();
      });
    });
  },
  rejectEmployee: (id) => {
    return new Promise((resolve, reject) => {
      Users.updateOne({ employeeId: id }, { rejected: true }).then((user) => {
        console.log(user);
        resolve();
      });
    });
  },
};
