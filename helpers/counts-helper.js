const { select } = require("../config/mysql-connection");
const { PENDING_STATUS, ACTIVE_STATUS } = require("../config/strings");
const Promise = require('promise');



module.exports = {

    getEnquiriesCountByUserAndDate: (userId, startDate, endDate) => {
        return new Promise((resolve, reject) => {
            var qry = `SELECT COUNT(*) AS count FROM ENQUIRY WHERE EMPLOYEE=${userId} AND DATE BETWEEN '${startDate}' AND '${endDate}'`;
            console.log(qry)
            select(qry).then((resp) => {
                resolve(resp[0].count);
            })
        })
    },
    getClosedEnquiriesCountByUserAndDate: (userId, startDate, endDate) => {
        return new Promise((resolve, reject) => {
            var qry = `SELECT COUNT(*) AS count FROM ENQUIRY WHERE EMPLOYEE=${userId} AND STATUS=1 AND DATE BETWEEN '${startDate}' AND '${endDate}'`;
            console.log(qry)
            select(qry).then((resp) => {
                resolve(resp[0].count);
            })
        })
    },
    getWorkingEnquiriesCountByUserAndDate: (userId, startDate, endDate) => {
        return new Promise((resolve, reject) => {
            var qry = `SELECT COUNT(*) AS count FROM ENQUIRY WHERE EMPLOYEE=${userId} AND STATUS=0 AND DATE BETWEEN '${startDate}' AND '${endDate}'`;
            console.log(qry)
            select(qry).then((resp) => {
                resolve(resp[0].count);
            })
        })
    }




}