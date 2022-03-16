const { Schema, model } = require('mongoose');

const schema = new Schema({

    enq_title: String,
    enq_date: Schema.Types.Date,
    enq_created_date: { type: Schema.Types.Date, default: new Date() },
    enq_client: { type: Schema.Types.ObjectId, ref: 'Clients' },
    enq_user: { type: Schema.Types.ObjectId, ref: 'Users' },
    enq_status: String,
    enq_close_date: Schema.Types.Date,
    closed_amount: Number,
    enq_updates: [
        {
            update_date: Schema.Types.Date,
            update_added_date: Schema.Types.Date,
            update_remarks: String,
            update_status: String,
            update_temp: String,

        }
    ]


});


module.exports = model('Enquiries', schema);