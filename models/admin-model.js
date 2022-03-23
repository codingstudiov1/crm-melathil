const { Schema, model } = require('mongoose');


const schema = new Schema({
    first_name: String,
    last_name: String,
    phone: String,
    email: String,
    password: String,

});

schema.virtual('full_name').get(function () {
    return `${this.first_name} ${this.last_name}`;
})


module.exports = model('Admin', schema);