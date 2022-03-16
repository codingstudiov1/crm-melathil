const Users = require('../models/user-model');

module.exports = {
    getUsersByStatus: (status) => {
        return new Promise((resolve, reject) => {
            Users.find({ user_status: status }).exec().then((response) => {
                resolve(response);
            }).catch(error => {
                console.log(error);
            })
        })
    },
    getSingleUser: (keys) => {
        return new Promise((resolve, reject) => {
            Users.findOne({ ...keys }).exec().then((response) => {
                resolve(response);
            }).catch(error => {
                console.log(error);
            })
        })
    },
    updateUsers: (id, data) => {
        return new Promise((resolve, reject) => {
            Users.findByIdAndUpdate(id, { ...data }).then((response) => {
                resolve(response);
            }).catch(error => {
                console.log(error);
            })
        })
    }
}