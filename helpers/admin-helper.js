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
          console.log(result);
        });
      } else {
        reject({ status: false, message: "User type already exist" });
      }
    });
  },
};
