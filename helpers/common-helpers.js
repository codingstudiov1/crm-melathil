const Promise = require('promise');

const User = require('../models/user-model');
const Manager = require('../models/manager-model');
const Admin = require('../models/admin-model');

module.exports = {
    createUser: (userData) => {
        return new Promise((resolve, reject) => {
            const user = new User(userData);
            console.log(user)
            user.save().then((response) => {
                resolve(response);
            }).catch(error => {
                reject(error);
                // console.log(error)
            })
        })
    },
    userPhoneDuplication: (number) => {
        return new Promise((resolve, reject) => {
            User.findOne({ phone: number }).then((isExist) => {
                if (isExist) resolve(true);
                else resolve(false)
            }).catch(error => {
                reject(error);
            })
        })
    },
    userEmailDuplication: (email) => {
        return new Promise((resolve, reject) => {
            User.findOne({ email: email }).then((isExist) => {
                if (isExist) resolve(true);
                else resolve(false)
            }).catch(error => {
                reject(error);
            })
        })
    },
    changeAdminPassword: (id, pass) => {
        return new Promise((resolve, reject) => {
            Admin.findByIdAndUpdate(id, { password: pass }).then((isExist) => {
                resolve();
            }).catch(error => {
                reject(error);
            })
        })
    }
}