const { Schema, model } = require('mongoose');

const schema = new Schema({

    enq_title: String,
    enq_date: Schema.Types.Date,
    enq_created_date: { type: Schema.Types.Date, default: new Date() },
    enq_client: { type: Schema.Types.ObjectId, ref: 'Clients' },
    enq_with: [{ type: Schema.Types.ObjectId, ref: "Clients" }],
    enq_user: { type: Schema.Types.ObjectId, ref: 'User' },
    enq_failed: { type: Boolean, default: false },
    enq_closed: { type: Boolean, default: false },
    enq_close_date: Schema.Types.Date,
    closed_amount: Number,
    enq_partial_closes: [
        {
            close_date: { type: Schema.Types.Date },
            close_remarks: String,
            close_amount: Number,
        }
    ],
    enq_updates: [
        {
            update_date: Schema.Types.Date,
            update_added_date: { type: Schema.Types.Date, default: new Date() },
            update_remarks: String,
            update_status: String,
            update_temparature: String,
        }
    ]


});


module.exports = model('Enquiries', schema);