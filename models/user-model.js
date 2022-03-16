const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    firstName: String,
    lastName: String,
    phone: { type: String },
    email: { type: String },
    gender: String,
    address: String,
    dob: Date,
    user_status: String,
    password: String,
    signup_date: { type: Date, default: new Date() },
    approval_date: { type: Date },
    approved_by: String,
    approved_designation: String,
    user_field: String,
    managed_by: { type: Schema.Types.ObjectId, ref: 'Manager' }

});


module.exports = model('User', userSchema);