const mongoose = require("mongoose");
const { USER_COLLECTION } = require("../config/collections");

const userSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    address: String,
    phone: String,
    email: String,
    dob: Date,
    gender: String,
  },
  {
    collection: USER_COLLECTION,
  }
);

module.exports = mongoose.model("Users", userSchema);
