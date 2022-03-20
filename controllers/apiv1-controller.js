const enquiryHelpers = require('../helpers/enquiry-helpers');
const moment = require('moment');


module.exports.getLastFiveDaysCounts = async (req, res, next) => {
    let days = [], successnumbers = [], failedNumbers = [], closedNumbers = [];
    for (var i = 5; i > 0; i--) {
        var startOfDay = moment().subtract(i, 'days').startOf('days');
        var endOfDay = moment().subtract(i, 'days').endOf('days');
        days = [...days, moment().subtract(i, 'days').format('MMM DD')]
        let activeCount = await enquiryHelpers.getCount({ enq_date: { $gte: startOfDay, $lte: endOfDay } });
        successnumbers = [...successnumbers, activeCount];
        let failedCount = await enquiryHelpers.getCount({ enq_date: { $gte: startOfDay, $lte: endOfDay }, enq_closed: true, enq_failed: true });
        failedNumbers = [...failedNumbers, failedCount];
        let closedCount = await enquiryHelpers.getCount({ enq_date: { $gte: startOfDay, $lte: endOfDay }, enq_closed: true, enq_failed: false });
        closedNumbers = [...closedNumbers,closedCount]
    }
    res.status(200).json({ days, success: successnumbers, failed: failedNumbers,closed:closedNumbers });

}
module.exports.getLastSixMonthsCounts = async (req, res, next) => {
    let months = [], successnumbers = [], failedNumbers = [], closedNumbers = [];
    for (var i = 6; i >= 0; i--) {
        var startOfMonth = moment().subtract(i, 'months').startOf('months');
        var endOfMonth = moment().subtract(i, 'months').endOf('months');
        months = [...months, moment().subtract(i, 'months').format('MMM YY')]
        let activeCount = await enquiryHelpers.getCount({ enq_date: { $gte: startOfMonth, $lte: endOfMonth } });
        successnumbers = [...successnumbers, activeCount];
        let failedCount = await enquiryHelpers.getCount({ enq_date: { $gte: startOfMonth, $lte: endOfMonth }, enq_closed: true, enq_failed: true });
        failedNumbers = [...failedNumbers, failedCount];
        let closedCount = await enquiryHelpers.getCount({ enq_date: { $gte: startOfMonth, $lte: endOfMonth }, enq_closed: true, enq_failed: false });
        closedNumbers = [...closedNumbers,closedCount]
    }
    res.status(200).json({ months, success: successnumbers, failed: failedNumbers,closed:closedNumbers });

}
