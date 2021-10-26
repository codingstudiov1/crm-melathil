const mongoose = require("mongoose");
const { ADMIN_COLLECTION } = require("../config/collections");

const adminSchema = mongoose.Schema(
  {
    username: String,
    password: String,
    fname: String,
    lname: String,
    email: String,
    phone: String,
  },
  {
    collection: ADMIN_COLLECTION,
  }
);

module.exports = mongoose.model("Admin", adminSchema);
