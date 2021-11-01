const Promise = require("promise");
const bcrypt = require("bcryptjs");
const instantHelper = require("../helpers/instant-helers");
// Models
const Clients = require("../models/client-model");
const ClientTypes = require("../models/client-type-model");

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
  createClientType: (data) => {
    return new Promise(function (resolve, reject) {
      ClientTypes.findOne({ typeName: data.typeName }).then((result) => {
        if (!result) {
          var clientTypes = new ClientTypes(data);
          clientTypes.save().then(() => {
            resolve();
          });
        } else {
          reject();
        }
      });
    });
  },
  getAllClientTypes: () => {
    return new Promise(function (resolve, reject) {
      ClientTypes.find().then((result)=>{
        resolve(result);
      })
    });
  },
};
