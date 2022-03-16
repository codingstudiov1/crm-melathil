const { Schema, model } = require('mongoose');

const schema = new Schema({

    type_name: String,

});


module.exports = model('ClientTypes', schema);