const { Schema, model } = require('mongoose');


const managerSchema = new Schema({
    first_name: String,
    last_name: String,
    phone: String,
    email: String,
    address: String,
    dob: String,
    gender: String,
    password: String,
    signup_date: { type: Date, default: new Date() },
    approval_date: { type: Date },
});

managerSchema.virtual('full_name').get(function () {
    return `${this.first_name} ${this.last_name}`;
})


module.exports = model('Manager', managerSchema);