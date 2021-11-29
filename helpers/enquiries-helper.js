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
    }
}