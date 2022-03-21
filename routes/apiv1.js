var express = require('express');
var router = express.Router();
const ApiV1Controller = require('../controllers/apiv1-controller');


router.get('/last-five-days-counts', ApiV1Controller.getLastFiveDaysCounts);
router.get('/last-six-months-counts', ApiV1Controller.getLastSixMonthsCounts);
router.get('/last-ten-days-sales-user', ApiV1Controller.processLastTenDaysSalesByUser);

module.exports = router;