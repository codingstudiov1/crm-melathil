const mongoose = require("mongoose");
const { USER_TYPE_COLLECTION } = require("../config/collections");

const userTypeSchema = mongoose.Schema(
  {
    usertype: String,
    permissions: {},
  },
  {
    collection: USER_TYPE_COLLECTION,
  },
  { strict: false }
);

module.exports = mongoose.model("UserTypes", userTypeSchema);
