const mongoose = require("mongoose");
const strings = require("../config/strings");

module.exports.createConnection = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(strings.localDatabase)
      .then(() => {
        resolve("Main Database Connected");
      })
      .catch((error) => {
        reject(error);
      });
  })
};
