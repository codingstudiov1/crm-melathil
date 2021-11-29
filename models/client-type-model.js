const mongoose = require("mongoose");
const { CLIENT_TYPE_COLLECTION } = require("../config/collections");

const clientTypeSchema = new mongoose.Schema(
  {
    typeName: String,
    active: Boolean,
  },
  {
    collection: CLIENT_TYPE_COLLECTION,
  }
);

module.exports = mongoose.model("Client_types", clientTypeSchema);
