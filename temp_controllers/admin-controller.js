const { USER_TYPES, REJECT_STATUS, ACTIVE_STATUS, PENDING_STATUS, RESIGN_STATUS } = require('../config/strings');
const mysqlHelper = require('../helpers/mysql-helper');
const moment = require('moment');
const countsHelper = require('../helpers/counts-helper');
const extra = { route: '/admin', layout: 'admin-layout' }



module.exports.loadOpenedEnquiries = async (req, res, next) => {
    let enquiries = await mysqlHelper.getOpenedEnquiries();
    console.log(enquiries)
    res.render('admin/enquiries', { ...extra, enquiries, moment, title: 'Opened Enquiries' });
}

module.exports.loadAllEnquiries = async (req, res, next) => {
}


module.exports.loadCloseEnquiry = (req, res, next) => {
    let enquiry = req.session?.enquirySession;
    console.log(enquiry);
    if (enquiry == undefined) {
        res.redirect('/admin/enquiries')
    }
    else {
        res.render('admin/close-enquiry', { ...extra, enquiry: enquiry.enquiry })
    }
}

module.exports.processCloseEnquiry = (req, res, next) => {

    let enquiryId = req.session?.enquirySession?.enquiry?.id;
    req.session.enquirySession = null;
    console.log(enquiryId);
    if (enquiryId == undefined) {
        res.redirect('/admin/enquiries')
    }
    else {
        let data = req.body;
        console.log(data);
        mysqlHelper.closeEnquiry(enquiryId, data).then(() => {
            res.redirect('/admin/enquiries/' + enquiryId);
        })
    }
}
