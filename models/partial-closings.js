const { Schema, model } = require('mongoose');

const schema = new Schema({
    close_user: { type: Schema.Types.ObjectId, ref: "Users" },
    close_enquiry: { type: Schema.Types.ObjectId, ref: 'Enquiries' },
    close_date: { type: Schema.Types.Date },
    close_remarks: String,
    close_amount: Number,
});


module.exports = model('PartialClosings', schema);