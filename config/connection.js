const mongoose = require("mongoose");
const strings = require("../config/strings");

module.exports.createConnection = () => {
  mongoose
    .connect(strings.localDatabase)
    .then(() => {
      console.info("Main Database Connected");
    })
    .catch((error) => {
      console.error("Failed to connect Mongodb\n", error);
    });
};
// module.exports.createLogConnection = () => {
//   mongoose.connect(strings.logDatabaseUrl)
//     .then(() => console.log("Log database connected"))
//     .catch((error) => console.error(error));
// }
