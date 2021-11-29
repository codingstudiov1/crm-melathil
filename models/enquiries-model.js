const mongoose = require('mongoose');


const enquirySchema = mongoose.Schema({
    addedDate: { type: Date, default: Date.now },
    employee: { type: mongoose.Schema.Types.ObjectId },
    details: [{
        title: String,
        date: Date,
        remarks: String,
        status: String,
        temparature: String,
    }]
});


module.exports = mongoose.model('Enquiries', enquirySchema);
