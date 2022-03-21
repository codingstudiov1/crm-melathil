const { Schema, model } = require('mongoose');

const schema = new Schema({
    close_user: { type: Schema.Types.ObjectId, ref: "User" },
    close_enquiry: { type: Schema.Types.ObjectId, ref: 'Enquiries' },
    close_date: { type: Schema.Types.Date },
    close_remarks:String,
    close_amount: Number,
    close_full: { type: Boolean },
    manager_verified: Boolean,
    manager_verified_date: { type: Schema.Types.Date }
});


module.exports = model('CloseRequests', schema);