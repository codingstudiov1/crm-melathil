const Promise = require("promise");
const bcrypt = require("bcryptjs");
const instantHelper = require("../helpers/instant-helers");
// Models
const Clients = require("../models/client-model");

module.exports = {
  getAllClients: () => {
    return new Promise(function (resolve, reject) {
      Clients.find().then((result) => {
        resolve(result);
      });
    });
  },
  createClient: (info) => {
    return new Promise(function (resolve, reject) {
      const clients = new Clients(info);
      clients.save().then((result) => {
        resolve(result);
      });
    });
  },
};
