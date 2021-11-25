const mongoose = require("mongoose");
const { ENQUIRIES_COLLECTION } = require("../config/collections");

const enquirySchema = mongoose.Schema(
  {
    client: mongoose.Types.ObjectId,
    employeeId: mongoose.Types.ObjectId,
    enquiryDate: Date,
    withMembers: [mongoose.Types.ObjectId],
  },
  {
    collection: ENQUIRIES_COLLECTION,
  }
);

module.exports = mongoose.model("Enquiries", enquirySchema);
