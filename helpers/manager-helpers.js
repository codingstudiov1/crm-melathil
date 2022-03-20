const Managers = require('../models/manager-model');

module.exports = {
    getManagers: () => {
        return new Promise((resolve, reject) => {
            Managers.find().exec().then((managers) => {
                resolve(managers)
            }).catch(error => {
                console.log(error);
            })
        })
    },
    createManager: (data) => {
        return new Promise((resolve, reject) => {
            const manager = new Managers(data);
            manager.save().then((response) => {
                resolve(response);
            }).catch(error => {
                console.log(error);
            })
        })
    },
    modifyManager: (id, data) => {
        return new Promise((resolve, reject) => {
            Managers.findByIdAndUpdate(id, { ...data }).then((response) => {
                resolve(response);
            }).catch(error => {
                console.log(error);
            })
        })
    },
    deleteManager: (id) => {
        return new Promise((resolve, reject) => {
            Managers.findByIdAndDelete(id).then((response) => {
                resolve(response);
            }).catch(error => {
                console.log(error);
            })
        })
    },
    getManagerDetailsById: (id) => {
        return new Promise((resolve, reject) => {
            Managers.findById(id).then((response) => {
                resolve(response);
            }).catch(error => {
                console.log(error);
            })
        })
    },
    getCount: (keys) => {
        return new Promise((resolve, reject) => {
            Managers.find({ ...keys }).count().then((response) => {
                resolve(response);
            }).catch(error => {
                console.log(error);
            })
        })
    }
}

