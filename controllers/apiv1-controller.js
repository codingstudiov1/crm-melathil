const enquiryHelpers = require('../helpers/enquiry-helpers');
const moment = require('moment');


module.exports.getLastFiveDaysCounts = async (req, res, next) => {
    let days = [], successnumbers = [], failedNumbers = [], closedNumbers = [];
    for (var i = 5; i > 0; i--) {
        var startOfDay = moment().subtract(i, 'days').startOf('days');
        var endOfDay = moment().subtract(i, 'days').endOf('days');
        days = [...days, moment().subtract(i, 'days').format('MMM DD')]
        successnumbers = [...successnumbers, await enquiryHelpers.getCount({ enq_date: { $gte: startOfDay, $lte: endOfDay } })];
        failedNumbers = [...failedNumbers, await enquiryHelpers.getCount({ enq_date: { $gte: startOfDay, $lte: endOfDay }, enq_closed: true, enq_failed: true })];
        closedNumbers = [...closedNumbers, enquiryHelpers.getCount({ enq_date: { $gte: startOfDay, $lte: endOfDay }, enq_closed: true, enq_failed: false })]
    }
    res.status(200).json({ days, success: successnumbers, failed: failedNumbers, closed: closedNumbers });

}
module.exports.getLastSixMonthsCounts = async (req, res, next) => {
    let months = [], successnumbers = [], failedNumbers = [], closedNumbers = [];
    for (var i = 6; i >= 0; i--) {
        var startOfMonth = moment().subtract(i, 'months').startOf('months');
        var endOfMonth = moment().subtract(i, 'months').endOf('months');
        months = [...months, moment().subtract(i, 'months').format('MMM YY')]
        successnumbers = [...successnumbers, await enquiryHelpers.getCount({ enq_date: { $gte: startOfMonth, $lte: endOfMonth } })];
        failedNumbers = [...failedNumbers, await enquiryHelpers.getCount({ enq_date: { $gte: startOfMonth, $lte: endOfMonth }, enq_closed: true, enq_failed: true })];
        closedNumbers = [...closedNumbers, await enquiryHelpers.getCount({ enq_date: { $gte: startOfMonth, $lte: endOfMonth }, enq_closed: true, enq_failed: false })]
    }
    res.status(200).json({ months, success: successnumbers, failed: failedNumbers, closed: closedNumbers });

}

module.exports.processLastTenDaysSalesByUser = async (req, res, next) => {
    try {
        let sales = [], days = [];
        let user = req.session.user; //To be replaced with session
        for (j = 9; j >= 0; j--) {
            days = [...days, moment().subtract(j, 'days').format('DD-MM-YYYY')]
            var startOfDay = moment().subtract(j, 'days').startOf('days');
            var endOfDay = moment().subtract(j, 'days').endOf('days');
            let sale = await enquiryHelpers.getPartialClosingAmountByDate(user, startOfDay, endOfDay);
            sales = [...sales, sale];
        }
        res.status(200).json({ days, sales });
    } catch (error) {
        console.log(error);
    }
}
module.exports.processLastSixMonthsSalesUser = async (req, res, next) => {
    try {
        let monthlySales = [], months = [];
        let user = req.session.user; //To be replaced with session
        for (i = 6; i >= 0; i--) {
            months = [...months, moment().subtract(i, 'months').format('MM-YYYY')]
            var startOfMonth = moment().subtract(i, 'months').startOf('months');
            var endOfMonth = moment().subtract(i, 'months').endOf('months');
            let saleMonth = await enquiryHelpers.getPartialClosingAmountByDate(user, startOfMonth, endOfMonth);
            monthlySales = [...monthlySales, saleMonth];
        }
        res.status(200).json({ months, monthlySales });
        // console.log(sal es)
    } catch (error) {
        console.log(error);
    }
}