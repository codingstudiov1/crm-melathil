const mongoose = require("mongoose");
const { USER_COLLECTION } = require("../config/collections");

const userSchema = mongoose.Schema(
  {
    employeeId: String,
    firstName: String,
    lastName: String,
    address: String,
    phone: String,
    email: String,
    dob: Date,
    gender: String,
    active:Boolean,
    rejected:Boolean,
    resigned:Boolean
  },
  {
    collection: USER_COLLECTION,
  }
);

module.exports = mongoose.model("Users", userSchema);
