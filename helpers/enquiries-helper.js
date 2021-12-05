const Promise = require("promise");
const bcrypt = require("bcryptjs");
const instantHelper = require("../helpers/instant-helers");
const Constants = require('../config/strings');
const Enquiries = require('../models/enquiries-model')
const DateFormat = require('date-format');
const mongoose = require("mongoose");


module.exports = {
    getEnquiries: (userId) => {
        return new Promise((resolve, reject) => {
            Enquiries.find({ employee: userId }).then((resp) => {
                if (resp) {
                    resp.forEach((element, index) => {
                        if (element?.date) {
                            resp[index].date = DateFormat("dd-mm-yyyy", resp[index].date);
                        }
                    });
                }
                console.log(resp)
                resolve(resp);
            })
        })
    },
    createEnquiry: (enqData) => {
        return new Promise((resolve, reject) => {
            enquiry = {
                title: enqData.title,
                employee: enqData.user,
                client: enqData.client,
                associate: enqData.associated,
                date: enqData.date,
                details: [
                    {
                        date: enqData.date,
                        remarks: enqData.remarks,
                        status: enqData.status,
                        temparature: enqData.temparature
                    }
                ]
            };
            console.log(enquiry);
            const enq = new Enquiries(enquiry);
            enq.save().then(resp => resolve(resp));
        })
    },
    viewEnquiryDetails: (id) => {
        return new Promise((resolve, reject) => {
            Enquiries.aggregate(
                [
                    {
                        '$match': {
                            '_id': mongoose.Types.ObjectId(id),
                        }
                    }, {
                        '$lookup': {
                            'from': 'clients',
                            'localField': 'client',
                            'foreignField': '_id',
                            'as': 'client'
                        }
                    }, {
                        '$unwind': '$client'
                    }
                ]
            )
                .then(response => {
                    resolve(response[0]);
                })
        })
    }
}