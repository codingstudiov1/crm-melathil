const Promise = require("promise");
const bcrypt = require("bcryptjs");
const instantHelper = require("../helpers/instant-helers");
const Constants = require('../config/strings');
// Models
const Admin = require("../models/admin-model");
const Users = require("../models/user-model");
const { ACTIVE_STATUS, REJECT_STATUS, PENDING_STATUS } = require("../config/strings");
const collections = require("../config/collections");
const strings = require("../config/strings");

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
          let employeeId = await instantHelper.generateMemberId();
          userData.password = await bcrypt.hash(userData.password, 10);
          userData.employeeId = employeeId;
          userData.status = Constants.PENDING_STATUS
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
    console.log(userInfo)
    return new Promise((resolve, reject) => {
      Users
        .aggregate(
          [
            {
              '$lookup': {
                'from': collections.USER_TYPE_COLLECTION,
                'localField': 'usertype',
                'foreignField': '_id',
                'as': 'usertype'
              }
            },
            {
              '$unwind': '$usertype'
            },
            // {
            //   '$match': {
            //     '$or': [
            //       {
            //         'email': userInfo.username
            //       }, {
            //         'phone': userInfo.username
            //       }, {
            //         'employeeId': userInfo.username
            //       }
            //     ]
            //   }
            // }
          ]
        )
        .then(async (result) => {
          console.log(result)
          if (result[0]) {

            switch (result[0].status) {
              case Constants.PENDING_STATUS: {
                reject({
                  status: false,
                  message: "Your verification is pending..Kindly wait for a while",
                });
              }
              case Constants.REJECT_STATUS: {
                reject({
                  status: false,
                  message: "No employees registered with the given..",
                });

              }
              case Constants.RESIGN_STATUS: {
                reject({
                  status: false,
                  message: "Currently you have no permission to access the website",
                });
              }
              case Constants.ACTIVE_STATUS: {
                const state = await bcrypt.compare(
                  userInfo.password,
                  result[0].password
                );
                if (!state) {
                  reject({
                    status: false,
                    message: "Invalid password..",
                  });
                } else {
                  delete result[0].password;
                  resolve({
                    status: true,
                    message: "Authentication succesful",
                    user: result[0],
                  });
                }
              }
              default: {
                reject({
                  status: false,
                  message: "Invalid operation detected",
                });
              }
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
        status: PENDING_STATUS,
      }).then((resonse) => {
        resolve(resonse);
      });
    });
  },
  getActiveEmployees: () => {
    return new Promise((resolve, reject) => {


      Users.aggregate(
        [
          {
            '$lookup': {
              'from': collections.USER_TYPE_COLLECTION,
              'localField': 'usertype',
              'foreignField': '_id',
              'as': 'usertype'
            }
          }, {
            '$unwind': '$usertype'
          }, {
            '$match': {
              'status': strings.ACTIVE_STATUS,
              'usertype.usertype': {
                '$ne': 'admin'
              }
            }
          }
        ]
      ).then((resp) => resolve(resp))


      //   Users.find({
      //     status: ACTIVE_STATUS,
      //   }).then((result) => {
      //     resolve(result)
      //   })
    })
  },
  approveEmployee: (id) => {
    return new Promise((resolve, reject) => {
      Users.updateOne({ employeeId: id }, { status: ACTIVE_STATUS }).then((user) => {
        console.log(user);
        resolve();
      });
    });
  },
  rejectEmployee: (id) => {
    return new Promise((resolve, reject) => {
      Users.updateOne({ employeeId: id }, { status: REJECT_STATUS }).then((user) => {
        console.log(user);
        resolve();
      });
    });
  },
};
