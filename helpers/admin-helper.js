const UserTypes = require("../models/usertype-model");

module.exports = {
  getAllUserTypes: () => {
    return new Promise((resolve, reject) => {
      UserTypes.find().then((result) => {
        resolve(result);
      });
    });
  },
  createNewUserType: (userData) => {
    return new Promise(async (resolve, reject) => {
      let userExist = await UserTypes.findOne({ usertype: userData.usertype });

      if (!userExist) {
        let userType = new UserTypes(userData);
        userType.save().then((result) => {
          resolve(result);
        });
      } else {
        reject({ status: false, message: "User type already exist" });
      }
    });
  },
  getUserType: (typeId) => {
    return new Promise((resolve, reject) => {
      UserTypes.findById(typeId).then((typeData) => {
        if (typeData?.permissions) {
          Object.keys(typeData.permissions).forEach(function (key) {
            typeData.permissions[key] = "checked";
          });
        }
        resolve(typeData);
      });
    });
  },
};
