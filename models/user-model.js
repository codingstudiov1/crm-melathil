const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    name: String,
    phone: String,
    email: String,
    gender: String,
    dob: Date,
    password: String,
    signup_date: { type: Date, default: new Date() },
    approval_date: { type: Date },
    approved_by: String,
    approved_designation: String,
    user_field: String,
    managed_by: { type: Schema.Types.ObjectId, ref: 'Manager' }

});


module.exports = model('User', userSchema);