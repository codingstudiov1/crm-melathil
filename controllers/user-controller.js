const clientsHelper = require("../helpers/clients-helper");

const moment = require('moment');
const userHelpers = require("../helpers/user-helpers");

const extra = { layout: 'user-layout', route: 'user', moment };


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