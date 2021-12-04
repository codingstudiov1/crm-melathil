const Promise = require("promise");
const bcrypt = require("bcryptjs");
const instantHelper = require("../helpers/instant-helers");
const Constants = require('../config/strings');
const Enquiries = require('../models/enquiries-model')


module.exports = {
    getEnquiries: (userId) => {
        return new Promise((resolve, reject) => {
            Enquiries.find({ employee: userId }).then((resp) => {
                resolve(resp);
            })
        })
    },
    createEnquiry: (enqData) => {
        return new Promise((resolve, reject) => {
            enquiry = {
                title: enqData.title,
                employee: eqnData.user,
                associate: enqData.associate,
                details: [
                    {
                        date: eqnData.date,
                        remarks: enqData.remarks,
                        status: enqData.status,
                        temparature: enqData.temparature
                    }
                ]
            };
            const enq = new Enquiries(enquiry);
            enq.save().then(resp => resolve(resp));
        })
    }
}