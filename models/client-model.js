const { Schema, model } = require('mongoose');

const schema = new Schema({

    client_name: String,
    client_email: String,
    client_phone: String,
    client_desi: String,
    client_address: String,
    client_type: { type: Schema.Types.ObjectId, ref: 'ClientTypes' },
    client_created_date: { type: Schema.Types.Date, default: new Date() },
    client_photo: String

});


module.exports = model('Clients', schema);