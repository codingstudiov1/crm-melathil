const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { CLIENTS_COLLECTION } = require("../config/collections");

const clientSchema = new mongoose.Schema(
  {
    name: String,
    address: String,
    phone: String,
    email: String,
    designation: String,
    createDate: Date,
    type:String
  },
  {
    collection: CLIENTS_COLLECTION,
  }
);

module.exports = mongoose.model("Clients", clientSchema);
