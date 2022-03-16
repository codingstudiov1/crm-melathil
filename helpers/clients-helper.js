const Promise = require('promise');

const User = require('../models/user-model');
const Manager = require('../models/manager-model');
const Clients = require('../models/client-model');
const ClientTypes = require('../models/client-type-model');

module.exports = {
    getClientDetails:(id)=>{
        return new Promise((resolve, reject) => {
            Clients.findById(id).populate('client_type').exec().then((response) => {
                resolve(response)
            }).catch(error => {
                reject(error);
            })
        })
    },
    loadClients: () => {
        return new Promise((resolve, reject) => {
            Clients.find().populate('client_type').exec().then((response) => {
                resolve(response)
            }).catch(error => {
                reject(error);
            })
        })
    },
        createClient: (data) => {
        return new Promise((resolve, reject) => {
            let client = new Clients(data);
            client.save().then((response) => {
                resolve(response)
            }).catch(error => {
                reject(error);
            })
        })
    },
    modifyClient: (id, data) => {
        return new Promise((resolve, reject) => {
            Clients.findByIdAndUpdate(id, { ...data }).then((response) => {
                resolve(response)
            }).catch(error => {
                reject(error);
            })
        })
    },
    deleteClient: (id) => {
        return new Promise((resolve, reject) => {
            Clients.findByIdAndDelete(id).then((response) => {
                resolve(response)
            }).catch(error => {
                reject(error);
            })
        })
    },
    getClientTypes: () => {
        return new Promise((resolve, reject) => {
            ClientTypes.find().exec().then((response) => {
                resolve(response)
            }).catch(error => {
                reject(error);
            })
        })
    },
    createClientType: (data) => {
        return new Promise((resolve, reject) => {
            let clientType = new ClientTypes(data);
            clientType.save().then((response) => {
                resolve(response)
            }).catch(error => {
                reject(error);
            })
        })
    },


}