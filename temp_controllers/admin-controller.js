const { USER_TYPES, REJECT_STATUS, ACTIVE_STATUS, PENDING_STATUS, RESIGN_STATUS } = require('../config/strings');
const mysqlHelper = require('../helpers/mysql-helper');
const moment = require('moment');
const countsHelper = require('../helpers/counts-helper');
const extra = { route: '/admin', layout: 'admin-layout' }



module.exports.loadPendingRequests = function (req, res, next) {
   
}
module.exports.loadWorkingEmployees = function (req, res, next) {
   
}

module.exports.loadResignedEmployees = (req,res,next)=>{
   
}
module.exports.loadRejectedEmployees = (req,res,next)=>{
   
}

module.exports.loadClients = async (req, res, next) => {

    
}
module.exports.loadEditClient = async (req, res, next) => {
    
};
module.exports.processEditClient = async (req, res, next) => {
   
};
module.exports.processDeleteClient = async (req, res, next) => {
  
};

module.exports.loadClientTypes = function (req, res, next) {
   
}
module.exports.loadClientTypeCreate = function (req, res, next) {

   
}
module.exports.processCreateClientType = function (req, res, next) {
    
}
module.exports.loadApproveEmployees = function (req, res, next) {
  
}

module.exports.processApproveUser = function (req, res, next) {
    

}

module.exports.loadEmployeeProfile = async (req, res, next) => {
    let empId = req.params.id;
    let monthStart = moment().startOf('month').format('YYYY-MM-DD');
    let monthEnd = moment().endOf('month').format('YYYY-MM-DD');
    let enquiriesCount = countsHelper.getEnquiriesCountByUserAndDate(empId, monthStart, monthEnd);
    res.render('admin/employee-profile', { ...extra, enquiriesCount });

}
module.exports.loadOpenedEnquiries = async (req, res, next) => {
    let enquiries = await mysqlHelper.getOpenedEnquiries();
    console.log(enquiries)
    res.render('admin/enquiries', { ...extra, enquiries, moment, title: 'Opened Enquiries' });
}

module.exports.loadAllEnquiries = async (req, res, next) => {
    let enquiries = await mysqlHelper.getAllEnquiries();
    res.render('admin/enquiries', { ...extra, enquiries, moment, title: 'All Enquiries' })
}
module.exports.loadClosedEnquiries = async (req, res, next) => {
    let enquiries = await mysqlHelper.getClosedEnquiries();
    res.render('admin/enquiries', { ...extra, enquiries, moment, title: 'Closed Enquiries' })
}
module.exports.loadEnquiryDetails = async (req, res, next) => {
    let id = req.params.id;
    let enquiries = await mysqlHelper.getEnquiryDetails(id);
    req.session.enquirySession = enquiries;
    console.log(enquiries);
    res.render('admin/view-enquiry-details', { ...extra, enq: enquiries, moment, title: 'Enquiry Details' })
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
module.exports.loadCreateManager = (req, res, next) => {
    mysqlHelper.getManagers().then(managers => {
        res.render('admin/create-manager', { ...extra, action: '/admin/create-manager', managers, title: 'Create Manager', manager: {} });
    })
}
module.exports.processCreateManager = (req, res, next) => {
    let data = req.body;
    mysqlHelper.createManager(data).then((response) => {
        res.redirect('/admin/create-manager');
    })
}
module.exports.loadEditManager = (req, res, next) => {
    let managerId = req.params.id;
    req.session.manager = managerId;
    mysqlHelper.getManagerDetails(managerId).then(manager => {
        mysqlHelper.getManagers().then(managers => {
            res.render('admin/create-manager', { ...extra, action: '/admin/edit-manager', managers, title: 'Edit Manager', manager: manager[0] });
        })
    })

}
module.exports.processEditManager = (req, res, next) => {
    let managerId = req.session.manager
    let data = req.body;
    mysqlHelper.updateManagerDetails(managerId, data).then((response) => {
        res.redirect('/admin/create-manager');
    })
}

module.exports.processDeleteManager = (req, res, next) => {
    let managerId = req.params.id;
    mysqlHelper.deleteManager(managerId).then(() => {
        res.redirect('/admin/create-manager');
    })
}