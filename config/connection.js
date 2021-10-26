const mongoose = require("mongoose");
const strings = require("../config/strings");

module.exports.createConnection = () => {
  mongoose
    .connect(strings.localDatabase)
    .then(() => {
      console.info("Mongodb connected");
    })
    .catch((error) => {
      console.error("Failed to connect Mongodb\n", error);
    });
};
