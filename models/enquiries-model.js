const mongoose = require('mongoose');


const enquirySchema = mongoose.Schema({
    title: String,
    addedDate: { type: Date, default: Date.now },
    date: Date,
    employee: { type: mongoose.Schema.Types.ObjectId },
    associate: [mongoose.Schema.Types.ObjectId],
    details: [{
        addedDate: { type: Date, default: Date.now },
        date: Date,
        remarks: String,
        status: String,
        temparature: String,
    }]
});


module.exports = mongoose.model('Enquiries', enquirySchema);
