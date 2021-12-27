const mongoose = require("mongoose");
const { AUTH_COLLECTION } = require("../config/collections");

const adminSchema = mongoose.Schema(
  {
    username: String,
    password: String,
  },
  {
    collection: AUTH_COLLECTION,
  }
);

module.exports = mongoose.model("Authentication", adminSchema);
