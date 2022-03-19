const clientsHelper = require("../helpers/clients-helper");

const moment = require('moment');
const userHelpers = require("../helpers/user-helpers");
const enquiryHelpers = require("../helpers/enquiry-helpers");
const { CLIENT_STATUS, CLIENT_TEMPARATURE, ENQUIRY_PROIRITY } = require("../config/strings");

const extra = { layout: 'user-layout', route: 'user', moment, name:"" };


module.exports.allClinets = function (req, res, next) {
    clientsHelper.loadClients().then((clients) => {
        res.render("clients/view-clients", { ...extra, title: "Clients list", clients });
    })
};

module.exports.loadCreateClient = async function (req, res, next) {
    clientsHelper.getClientTypes().then((clientTypes) => {
        res.render("clients/create_edit", { ...extra, clientTypes, clientData: {}, title: 'Create client', formId: 'formCreateClient', action: "/user/clients/create" });
    })
};

module.exports.processCreateClient = function (req, res, next) {
    let data = req.body;
    clientsHelper.createClient(data).then(() => {
        res.redirect('/user/clients')
    })
};

module.exports.loadEnquiries = async (req, res, next) => {

    let userSession = req.session.userSession;
    let enquiries = await enquiryHelpers.getEnquiries({ enq_user: "6232335750ce51faa37d42dd" }, { enq_title: 1, enq_date: 1, enq_client: 1, enq_with: 0, enq_user: 0 }); //To be replaced with session
    console.log(enquiries);
    res.render("enquiries/view-enquiries", { ...extra, enquiries, title: "Enquiries", });
};
module.exports.loadCreateEnquiries = async (req, res, next) => {
    const clients = await clientsHelper.loadClients();
    const title = "Create Enquiry";
    const action = "/user/enquiries/create";
    const status = CLIENT_STATUS;
    const temp = CLIENT_TEMPARATURE;
    const enqClass = ENQUIRY_PROIRITY;
    res.render("enquiries/add_edit_enquiries", { ...extra, clients, title, action, status, temp, enqClass });
};


module.exports.processCreateEnquiry = (req, res, next) => {
    let enquiryData = req.body;
    enquiryData.enq_user = '6232335750ce51faa37d42dd';        //To be replaced with session
    enquiryData.enq_updates =
    {
        update_date: enquiryData.enq_date,
        update_status: enquiryData.enq_status,
        update_temparature: enquiryData.enq_temparature,
        update_remarks: enquiryData.enq_remarks,
    }

    enquiryHelpers.createEnquiry(enquiryData).then(response => {
        console.log(response);
    })

};
module.exports.processCloseRequest = (req, res, next) => {
    let data = req.body;
    data.close_full = data?.close_full ? true : false;
    // console.log(data.close_full);
    data.close_enquiry = req.session.enquiryId;
    data.close_user = '6232335750ce51faa37d42dd';
    enquiryHelpers.newCloseRequest(data).then(() => {
        res.redirect(`/user/enquiries/view/${req.session.enquiryId}`)
    })
}

module.exports.loadViewEnquiries = (req, res, next) => {
    let enqId = req.params.id;
    req.session.enquiryId = enqId;
    let user = '6232335750ce51faa37d42dd'; //To be replaced with session
    enquiryHelpers.getEnquiries({ _id: enqId, enq_user: user }, { _id: 0 }).then((details) => {
        if (details.length > 0) enq = details[0];
        else enq = {};
        res.render("enquiries/view_enuiry_details", { ...extra, title: "Enquiry Details", enq, moment });
    })
};
module.exports.loadEnquiryUpdateCreate = (req, res, next) => {

    if (req.session.enquiryId == undefined) res.redirect('/user/enquiries')
    else res.render("enquiries/add_edit_updates", { ...extra, title: "Update Enquiry", action: "/user/enquiries/update/", status: CLIENT_STATUS, temp: CLIENT_TEMPARATURE });
};
module.exports.processEnquiryUpdateCreate = (req, res, next) => {
    let enqId = req.session.enquiryId;
    let data = req.body;
    enquiryHelpers
        .pushEnquiries(enqId, data)
        .then(() => res.redirect(`/user/enquiries/view/${enqId}`));
};
module.exports.loadEnquiryReportRequest = async (req, res, next) => {
    let user = '6232335750ce51faa37d42dd'; //To be replaced with session
    let clients = await clientsHelper.loadClients()
    let temparature = CLIENT_TEMPARATURE;
    let status = CLIENT_STATUS;
    res.render('reports/client-enquiry-report', { ...extra, title: "Get Report", status, temparature, clients, enquiries: [] });

}